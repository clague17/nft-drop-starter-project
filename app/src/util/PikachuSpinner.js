import React from "react";
import { Image } from "@chakra-ui/react";

const PikachuSpinner = () => {
  return (
    <div style={{ maxWidth: "100%", maxHeight: "100%" }}>
      <Image
        boxSize="50px"
        objectFit="cover"
        alt="dancing pikachu"
        maxWidth="100%"
        src="https://emoji.gg/assets/emoji/5541-running-pikachu.gif"
      />
    </div>
  );
};

export default PikachuSpinner;
