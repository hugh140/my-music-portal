import Template from "../components/template/Template";
import Headline from "../components/indexPage/Headline";
import BlogRecents from "../components/indexPage/BlogRecents";
import MusicRecents from "../components/indexPage/MusicRecents";
import LiveAnimations from "../components/indexPage/LiveAnimations";

import useHeaders from "../hooks/headers";
import useMusic from "../hooks/music";
import useSoftware from "../hooks/software";

function MainPage() {
  const headers = useHeaders(0, 6);
  const music = useMusic(3);
  const software = useSoftware();

  return (
    <Template>
      <Headline header={headers[0]} />

      <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

      <BlogRecents blogs={headers.slice(1, headers.length)} />

      <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

      <MusicRecents releases={music} />

      <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

      <LiveAnimations webPages={software.slice(0, 3)} />

      <div className="mx-auto h-16 w-4" />
    </Template>
  );
}

export default MainPage;
