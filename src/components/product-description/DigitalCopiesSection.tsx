import React from "react";

const DigitalCopiesSection: React.FC = () => (
    <p className="text-xs font-bold mt-5">
        Also you can discover the world through the lens of a professional photographer. I offer high-quality digital
        copies of photos for sale online.
        <span className="flex justify-center m-3 pointer">
      <a
          href="https://thelensofandrei.picfair.com"
          rel="noreferrer"
          target="_blank"
          className="flex justify-center"
      >
        <img
            style={{maxWidth: "25%"}}
            alt="picfair"
            src="https://logowik.com/content/uploads/images/picfair3077.logowik.com.webp"
        />
      </a>
    </span>
    </p>
);

export default DigitalCopiesSection;
