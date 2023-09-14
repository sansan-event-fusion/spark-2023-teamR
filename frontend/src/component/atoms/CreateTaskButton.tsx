import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  FormControl,
  Input,
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import { AddIcon, Icon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { Task } from "../../type/Types";
import { useContext } from "react";
import { TaskContext } from "../../TaskContext";
import { useAuth } from "../../AuthContext";
import { accessPointURL } from "../../api/accessPoint";

type formInputs = {
  task_name: string;
  task_content: string;
};

const CreateTaskButton = ({
  activeFolderId,
}: {
  activeFolderId: number | null;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, auth } = useAuth();
  const { tasks, setTasks } = useContext(TaskContext);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit((data) => {
    const taskId = tasks.length + 1;
    const newTask: Task = {
      id: taskId,
      title: data.task_name,
      content: data.task_content,
      memo: data.task_name,
      status: "todo",
    };

    const postTaskData = {
      receiver_id: user.id,
      folder_id: activeFolderId,
      title: data.task_name,
      content: data.task_content,
      memo: "",
      status: "todo",
    };

    const postTask = async (token: string) => {
      const response = await fetch(`${accessPointURL}task/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(postTaskData),
      });
      if (response.status === 201) {
        const responseData = await response.json();
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return newTask;
            } else {
              return task;
            }
          })
        );
      } else {
        console.log("POST失敗");
      }
    };

    postTask(auth.token);

    data.task_name = "";
    data.task_content = "";

    onClose();
  });

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"blue.100"}
        _hover={{
          bg: "gray.300",
          ".rotate-icon": {
            transform: "rotate(90deg)",
            transition: "transform 0.3s",
          },
        }}
        border={"1px solid"}
        borderColor={"gray.300"}
      >
        <HStack>
          <Icon as={AddIcon} className="rotate-icon" />
          <p>タスクを作成</p>
        </HStack>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスクを作成</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>タスク名</FormLabel>
                <Input
                  id="task_name"
                  type="text"
                  {...register("task_name", {
                    required: "タスク名を入力してください",
                    maxLength: {
                      value: 20,
                      message: "タスク名は20文字以内で入力してください",
                    },
                  })}
                />
                {errors.task_name && (
                  <FormErrorMessage>
                    {errors.task_name.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>タスク内容</FormLabel>
                <Input
                  id="task_content"
                  type="text"
                  {...register("task_content", {
                    required: "タスク内容を入力してください",
                    maxLength: {
                      value: 200,
                      message: "タスク内容は200文字以内で入力してください",
                    },
                  })}
                />
                {errors.task_content && (
                  <FormErrorMessage>
                    {errors.task_content.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <ModalFooter>
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  bg="blue.400"
                  textColor="white"
                >
                  作成
                </Button>
              </ModalFooter>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreateTaskButton };
