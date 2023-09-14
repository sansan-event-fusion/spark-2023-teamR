import { Button } from "@chakra-ui/react";
import { useAuth } from "../../AuthContext";
import { accessPointURL } from "../../api/accessPoint";

const DoButton = ({
  taskId,
  onClose,
  memo,
}: {
  taskId: number;
  onClose: () => void;
  memo: string;
}) => {
  console.log("taskId:", taskId);
  const { auth } = useAuth();

  const patchStatus = async () => {
    const response = await fetch(`${accessPointURL}task/${taskId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Token ${auth.token}`,
      },
      body: `status=doing`,
    });
    if (response.status === 200) {
      console.log("status PATCH成功", response);
      onClose();
    } else {
      console.log("status PATCH失敗", response);
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
      console.log("memo PATCH失敗", response);
    }
  };

  const handleClick = async () => {
    patchStatus();
    patchMemo();
  };

  return (
    <Button
      onClick={handleClick}
      bg={"yellow.500"}
      textColor={"white"}
      _hover={{ opacity: 0.8 }}
    >
      取り組む
    </Button>
  );
};

export { DoButton };
