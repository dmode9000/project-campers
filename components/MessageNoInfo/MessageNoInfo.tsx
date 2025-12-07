import styles from "./MessageNoInfo.module.css";

type MessageNoInfoProps = {
  text: string;
  buttonText: string;
  route?: string | null;
  onClick?: (() => void);
};

export default function MessageNoInfo({
  text,
  buttonText,
  route = null,
  onClick,
}: MessageNoInfoProps) {
  return (
    <div className={styles.noOrdersWrapper}>

      <p className={styles.messageText}>{text}</p>

      <button className={`btn-primary ${styles.shopButton}`} onClick={onClick}>
        {buttonText}
      </button>

    </div>
  );
}

