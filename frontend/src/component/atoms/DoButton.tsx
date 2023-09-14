import { Button } from "@chakra-ui/react";
import { useAuth } from "../../AuthContext";
import { accessPointURL } from "../../api/accessPoint";
import { Task } from "../../type/Types";

const DoButton = ({ taskId }: { taskId: Task }) => {
  console.log("taskId:", taskId);
  const { auth } = useAuth();
  const handleClick = async () => {
    const response = await fetch(`${accessPointURL}task/${taskId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Token ${auth.token}`,
      },
      body: `status=doing`,
    });
    if (response.status === 200) {
      console.log("PATCH成功", response);
    } else {
      console.log("PATCH失敗", response);
    }
  };

  return (
    <Button
      onClick={() => handleClick()}
      bg={"yellow.500"}
      textColor={"white"}
      _hover={{ opacity: 0.8 }}
    >
      取り組む
    </Button>
  );
};

export { DoButton };
