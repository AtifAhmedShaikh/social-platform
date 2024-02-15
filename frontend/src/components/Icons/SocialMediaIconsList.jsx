import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const SocialMediaIconsList = () => {
  return (
    <React.Fragment>
      <EmailShareButton
        url="Hello_Shared_content"
        subject="subject here"
        body=""
      >
        <EmailIcon size="40" round={true} />
      </EmailShareButton>
      <WhatsappShareButton
        url="Hello_Shared_content"
        subject="subject here"
        body=""
      >
        <WhatsappIcon size="40" round={true} />
      </WhatsappShareButton>
      <TwitterShareButton
        url="Hello_Shared_content"
        subject="subject here"
        body=""
      >
        <TwitterIcon size="40" round={true} />
      </TwitterShareButton>
      <FacebookShareButton
        url="Hello_Shared_content"
        subject="subject here"
        body=""
      >
        <FacebookIcon size="40" round={true} />
      </FacebookShareButton>
      <LinkedinShareButton
        url="Hello_Shared_content"
        subject="subject here"
        body=""
      >
        <LinkedinIcon size="40" round={true} />
      </LinkedinShareButton>
    </React.Fragment>
  );
};

export default SocialMediaIconsList;
