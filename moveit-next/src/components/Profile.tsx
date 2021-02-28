import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={ styles. profileContainer }>
      <img src="https://github.com/layokaminski.png" alt="Layo Kaminski" />
      <div>
        <strong>Layo Kaminski</strong>
        <p>Level 1</p>
      </div>
    </div>
  );
}