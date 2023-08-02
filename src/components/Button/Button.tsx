import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};

export default Button;
