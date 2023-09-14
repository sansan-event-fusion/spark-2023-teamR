import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmileWink,
  faFaceSurprise,
  faFaceKissWinkHeart,
  faFaceGrinSquintTears,
  faFaceGrinBeamSweat,
  faFaceGrimace,
  faFaceDizzy,
  faFaceGrinHearts,
  faFaceGrinTongueSquint,
  faFaceMehBlank,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Center, Wrap, WrapItem } from "@chakra-ui/react";

export const iconList = [
  {
    id: 1,
    icon: faFaceSmileWink,
    color: "#fbd92e",
    size: "2xl",
    animation: "fa-bounce",
  },
  {
    id: 2,
    icon: faFaceSurprise,
    color: "#f503f6",
    size: "2xl",
    animation: "fa-spin",
  },
  {
    id: 3,
    icon: faFaceKissWinkHeart,
    color: "#fe3d7f",
    size: "2xl",
    animation: "fa-beat",
  },
  {
    id: 4,
    icon: faFaceGrinSquintTears,
    color: "#26a3ef",
    size: "2xl",
    animation: "fa-pulse",
  },
  {
    id: 5,
    icon: faFaceGrinBeamSweat,
    color: "#7bb241",
    size: "2xl",
    animation: "fa-bounce",
  },
  {
    id: 6,
    icon: faFaceGrimace,
    color: "#f1a900",
    size: "2xl",
    animation: "fa-bounce",
  },
  {
    id: 7,
    icon: faFaceDizzy,
    color: "#9f9f9f",
    size: "2xl",
    animation: "fa-spin",
  },
  {
    id: 8,
    icon: faFaceGrinHearts,
    color: "#ea3f79",
    size: "2xl",
    animation: "fa-beat",
  },
  {
    id: 9,
    icon: faFaceGrinTongueSquint,
    color: "#5d17f6",
    size: "2xl",
    animation: "fa-pulse",
  },
  {
    id: 10,
    icon: faFaceMehBlank,
    color: "#ad2c27",
    size: "2xl",
    animation: "fa-bounce",
  },
];

type Props = {
  selectedFace: Icon[];
  setSelectedFace: React.Dispatch<React.SetStateAction<Icon[]>>;
};

export type Icon = {
  id: number;
  icon: any;
  color: string;
  size: string;
  animation?: string;
};

//クリックしたアイコンをselectedFaceに追加して、selectedFaceを返す
const handleIconClick = (icon: Icon, selectedFace: Icon[]) => {
  if (selectedFace.some((face) => face.id === icon.id)) {
    return selectedFace.filter((face) => face.id !== icon.id);
  } else {
    return [...selectedFace, icon];
  }
};

const FaceIcons = ({ selectedFace, setSelectedFace }: Props) => {
  return (
    <Wrap w="380px">
      {iconList.map((icon) => (
        <WrapItem>
          <Center>
            <Button
              key={icon.id}
              bg="none"
              onClick={() => {
                setSelectedFace(handleIconClick(icon, selectedFace));
              }}
            >
              <FontAwesomeIcon
                icon={icon.icon}
                style={{ color: icon.color }}
                size={icon.size as any}
                className={icon.animation}
              />
            </Button>
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export { FaceIcons };
