import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button = ({ onClick, children, disabled }: ButtonProps) => {
  return (
    <button disabled={disabled} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
