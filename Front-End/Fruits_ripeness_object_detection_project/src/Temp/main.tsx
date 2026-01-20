import React from "react";

interface MyButtonProps {
    title: string;
    disable?: boolean; // Optional prop, default is false
}

const MyButton: React.FC<MyButtonProps> = ({ title, disable = false }) => {
    return (
        <button disabled={disable} className="btn btn-primary">
            {title}
        </button>
    );
};

const Main: React.FC = () => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert("Button clicked!");
        console.log(event);
    };

    return (
        <div className="text-center">
            <h1>Welcome to our React App!</h1>
            <p>This is a simple React app with basic routing.</p>
            <MyButton title="Click Me" disable={true} />
            <button onClick={handleClick} className="btn btn-secondary">
                Click Me
            </button>
        </div>
    );
};

export default Main;
