import { Button } from "@chakra-ui/react";
import { useAuth } from "../../AuthContext";
import { accessPointURL } from "../../api/accessPoint";

const DoneButton = ({
  taskId,
  onClose,
  memo,
}: {
  taskId: number;
  onClose: () => void;
  memo: string;
}) => {
  const { auth } = useAuth();
  const patchStatus = async () => {
    const response = await fetch(`${accessPointURL}task/${taskId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Token ${auth.token}`,
      },
      body: `status=done`,
    });
    if (response.status === 200) {
      console.log("status PATCH成功", response);
      onClose();
    } else {
      console.log("PATCH失敗", response);
    }
  };

  const patchMemo = async () => {
    const response = await fetch(`${accessPointURL}task/${taskId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Token ${auth.token}`,
      },
      body: `memo=${memo}`,
    });
    if (response.status === 200) {
      console.log("memo PATCH成功", response);
      onClose();
    } else {
      console.log("PATCH失敗", response);
    }
  };

  const handleClick = async () => {
    console.log("1つめ");
    await patchStatus();
    console.log("2つめ");

    await patchMemo();
  };

  return (
    <Button
      onClick={() => handleClick()}
      bg={"blue.500"}
      textColor={"white"}
      _hover={{ opacity: 0.8 }}
    >
      Done !
    </Button>
  );
};

export { DoneButton };
