import { Button } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

import {
  faFaceSmile,
  faFaceSmileWink,
  faFaceSurprise,
  faFaceKissWinkHeart,
  faFaceGrinSquintTears,
  faFaceGrinBeamSweat,
  faFaceGrimace,
  faFaceDizzy,
  faFaceMehBlank,
  faFaceGrinHearts,
  faFaceGrinTongueSquint,
} from "@fortawesome/free-regular-svg-icons";

interface FaceData {
  id: number;
  stamp: any;
  animation: string;
  color: string;
}

interface FaceComponentProps {
  stampName: string;
}

const faces: Record<string, FaceData> = {
  smile: {
    id: 1,
    stamp: faFaceSmileWink,
    animation: "bounce",
    color: "#fbd92e",
  },
  suprise: {
    id: 2,
    stamp: faFaceSurprise,
    animation: "spin",
    color: "#f503f6",
  },
  kiss: {
    id: 3,
    stamp: faFaceKissWinkHeart,
    animation: "beatFade",
    color: "#fe3d7f",
  },
  squint: {
    id: 4,
    stamp: faFaceGrinSquintTears,
    animation: "shake",
    color: "#26a3ef",
  },
  beam: { id: 5, stamp: faFaceGrinBeamSweat, animation: "", color: "#7bb241" },
  grimace: {
    id: 6,
    stamp: faFaceGrimace,
    animation: "bounce",
    color: "#f1a900",
  },
  dizzy: { id: 7, stamp: faFaceDizzy, animation: "spin", color: "#9f9f9f" },
  hearts: {
    id: 8,
    stamp: faFaceGrinHearts,
    animation: "beatFade",
    color: "#ea3f79",
  },
  tongue: {
    id: 9,
    stamp: faFaceGrinTongueSquint,
    animation: "shake",
    color: "#5d17f6",
  },
  blank: {
    id: 10,
    stamp: faFaceMehBlank,
    animation: "bounce",
    color: "#ad2c27",
  },
};

function Faces({ stampName }: FaceComponentProps) {
  const [selectedFace, setSelectedFace] = useState<number[]>([]);
  const [reactions, setReactions] = useState<number[]>([]);

  const handleStampClick = (stampNum: number) => {
    setReactions([...reactions, stampNum]);
  };

  return (
    <Button bg="none" onClick={() => handleStampClick(0)}>
      <FontAwesomeIcon
        icon={faces[stampName].stamp}
        style={{ color: faces[stampName].color }}
        animation={faces[stampName].animation}
        size="2xl"
      />
    </Button>
  );
}

export default Faces;
