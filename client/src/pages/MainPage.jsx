import Template from "../components/template/template";
import Headline from "../components/indexPage/Headline";
import BlogRecents from "../components/indexPage/BlogRecents";
import MusicRecents from "../components/indexPage/MusicRecents";
import LiveAnimations from "../components/indexPage/LiveAnimations";

function MainPage() {
  return (
    <Template>
        <Headline />

        <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

        <BlogRecents />

        <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

        <MusicRecents />

        <div className="mx-auto h-8 w-4 border-x-4 border-double border-neutral-400" />

        <LiveAnimations />

        <div className="mx-auto h-16 w-4" />
    </Template>
  );
}

export default MainPage;
