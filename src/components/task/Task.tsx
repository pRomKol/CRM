import {useState} from 'react';
import { deleteTodo, updateTodo } from "../../api/todo.api.ts";
import { Button, Checkbox, CheckboxProps, Form, Input, notification } from "antd";

type TaskProps = {
    id: number;
    isDone: boolean;
    title: string;
    getTodosByCurrentFilter: () => void;
};

export const Task = (props: TaskProps) => {
    const [editMode, setEditMode] = useState(false);
    const [form] = Form.useForm();

    const deleteHandler = async () => {
        try {
            await deleteTodo(props.id);
            props.getTodosByCurrentFilter();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to delete the task. Please try again.',
            });
        }
    };

    const saveChangesHandler = async (values: { title: string }) => {
        try {
            await updateTodo(props.id, { isDone: props.isDone, title: values.title });
            props.getTodosByCurrentFilter();
            setEditMode(false);
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to save changes. Please try again.',
            });
        }
    };

    const toggleCheckboxHandler: CheckboxProps['onChange'] = async (e) => {
        try {
            await updateTodo(props.id, { isDone: e.target.checked, title: props.title });
            props.getTodosByCurrentFilter();
        } catch (error) {
            notification.error({
                message: 'Error',
                description: 'Failed to update task status. Please try again.',
            });
        }
    };

    const editStateHandler = () => {
        setEditMode(true);
        form.setFieldsValue({ title: props.title });
    };

    const handleCancelClick = () => {
        setEditMode(false);
        form.resetFields();
    };

    return (
        <li key={props.id} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px'}}>
            <Checkbox
                onChange={toggleCheckboxHandler}
                checked={props.isDone}
            />
            <div onDoubleClick={editStateHandler}>
                {editMode ? (
                    <Form
                        form={form}
                        onFinish={saveChangesHandler}
                        initialValues={{ title: props.title }}
                    >
                        <Form.Item
                            name="title"
                            rules={[
                                { required: true, message: 'Title is required!' },
                                { min: 2, message: 'Must be more than 2 characters!' },
                                { max: 64, message: 'Must be less than 64 characters!' }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                            <Button onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <h3>{props.title}</h3>
                )}
            </div>
            <div className="buttons">
                {!editMode && (
                    <Button onClick={editStateHandler}>
                        Edit
                    </Button>
                )}
                <Button onClick={deleteHandler}>
                    Delete
                </Button>
            </div>
        </li>
    );
};