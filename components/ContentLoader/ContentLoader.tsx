import css from './ContentLoader.module.css';

export default function ContentLoader() {
  return (
    <div className={css.wrapper}>
      <div className={css.loader}>
        <div className={`${css.cell} ${css['d-0']}`}></div>
        <div className={`${css.cell} ${css['d-1']}`}></div>
        <div className={`${css.cell} ${css['d-2']}`}></div>

        <div className={`${css.cell} ${css['d-1']}`}></div>
        <div className={`${css.cell} ${css['d-2']}`}></div>

        <div className={`${css.cell} ${css['d-2']}`}></div>
        <div className={`${css.cell} ${css['d-3']}`}></div>

        <div className={`${css.cell} ${css['d-3']}`}></div>
        <div className={`${css.cell} ${css['d-4']}`}></div>
      </div>
    </div>
  );
}
