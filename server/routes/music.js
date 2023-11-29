const express = require("express");
const router = express.Router();
const axios = require("axios");
const errorMessage = require("../scripts/errorHandler");

let token;
let tokenExpire = 0;

async function getAccessToken() {
  if (tokenExpire < Date.now()) {
    const responseToken = await axios.post(
      "https://accounts.spotify.com/api/token",
      {},
      {
        headers: {
          Authorization: "Basic " + process.env.CLIENT_CREDENTIALS,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "client_credentials",
        },
      }
    );
    token = responseToken.data.access_token;
    tokenExpire = Date.now() + responseToken.data.expiresIn;
  }
}

router.get("/headers", async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    await getAccessToken();

    const responseAlbums = await axios.get(
      "https://api.spotify.com/v1/artists/24jdozzorQvY6RrWyB1i4s/albums",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          limit: limit,
        },
      }
    );

    const albums = [];
    for (const album of responseAlbums.data.items)
      albums.push({
        id: album.id,
        name: album.name,
        artistName: album.artists[0].name,
        cover: album.images[1].url,
      });

    res.json(albums);
  } catch (e) {
    errorMessage(res, e, 500);
  }
});

router.get("/release/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("The album id is missing");
    await getAccessToken();

    const responseAlbum = await axios.get(
      "https://api.spotify.com/v1/artists/24jdozzorQvY6RrWyB1i4s/albums",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          limit: 20,
        },
      }
    );

    const albums = responseAlbum.data.items;
    const indexId = (() => {
      for (let i = 0; i < albums.length; i++) if (albums[i].id === id) return i;
      throw new Error("The album is propably by another artist.");
    })();
    const item = responseAlbum.data.items[indexId];

    const album = {
      id: item.id,
      name: item.name,
      artist: {
        name: item.artists[0].name,
        url: item.artists[0].external_urls.spotify,
      },
      release_date: item.release_date,
      url: item.external_urls.spotify,
      cover: item.images[0].url,
    };

    res.json(album);
  } catch (e) {
    errorMessage(res, e, 400);
  }
});

module.exports = router;
