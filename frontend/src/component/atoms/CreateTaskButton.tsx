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
import { Folder, Folders, Task } from "../../type/Types";

type formInputs = {
  task_name: string;
  task_content: string;
};

type Props = {
  folder: Folder;
  folders: Folders;
  setFolders: React.Dispatch<React.SetStateAction<Folders>>;
};

const CreateTaskButton = ({ folder, folders, setFolders }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit((data) => {
    const taskId = folder.tasks.length + 1;
    const newTask: Task = {
      id: taskId,
      title: data.task_name,
      content: data.task_content,
      status: "todo",
    };

    data.task_name = "";
    data.task_content = "";

    const newFolder = {
      ...folder,
      tasks: [...folder.tasks, newTask],
    };

    const newFolders = folders.map((folder) =>
      folder.id === newFolder.id ? newFolder : folder
    );
    setFolders(newFolders);

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
