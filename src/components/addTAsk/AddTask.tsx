import { addTodo } from "../../api/todo.api.ts";
import { Button, Input, Form, Flex } from "antd";

type HeaderPropsType = {
    getTodosByCurrentFilter: () => void;
};

export const AddTask = (props: HeaderPropsType) => {
    const [form] = Form.useForm();

    const addTodoHandler = async (values: { title: string }) => {
        try {
            await addTodo({ isDone: false, title: values.title });
            props.getTodosByCurrentFilter();
            form.resetFields();
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    return (
        <section className='header'>
            <Form
                form={form}
                onFinish={addTodoHandler}
            >
                <Flex gap="small" align="center">
                    <Form.Item
                        name="title"
                        rules={[
                            { min: 2, message: 'Must be more than 2 characters' },
                            { max: 64, message: 'Must be less than 64 characters' },
                        ]}
                        style={{ flex: 1 }}
                    >
                        <Input placeholder="Enter task" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            ADD
                        </Button>
                    </Form.Item>
                </Flex>
            </Form>
        </section>
    );
};