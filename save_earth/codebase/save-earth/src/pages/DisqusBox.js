import React from 'react';
import Disqus from "disqus-react"

const DisqusBox = ({detail}) => {
  const disqusShortname = "discoveringearth"
  const disqusConfig = {
    url: `http://localhost:8888/detail/${detail.created_at}`,
    identifier: detail.created_at,
    title: detail.name
  }

  return (
    <div className="mb-1">
      <div className="">

        <h1>{ detail.name }</h1>

        <p>What do you know about {detail.name }.</p>

        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </div>
  );
};

export default DisqusBox;
