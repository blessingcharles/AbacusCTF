import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={styles.container}>
      <div className={props.selected ? styles.btn2 : styles.btn}>
        <a
          href={props.link}
          onClick={() => {
            props.onClick &&
              (props.parameters
                ? props.onClick(props.parameters)
                : props.onClick());
          }}
        >
          {props.title}
        </a>
      </div>
    </div>
  );
};

export default Button;
