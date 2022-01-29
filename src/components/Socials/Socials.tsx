import s from './Socials.module.css'

export const Socials = () => (
  <div className={s.socialsContainer}>
    <ul>
      <li className={'inline'}>
        <a href="https://twitter.com/kyleecodes">
          <img className={s.socialIcon} src="/discord.png"></img>
        </a>
      </li>
      <li className={'inline'}>
        <a href="https://twitter.com/kyleecodes">
          <img className={s.socialIcon} src="/opensea.png"></img>
        </a>
      </li>
      <li className={'inline'}>
        <a href="https://twitter.com/kyleecodes">
          <img className={s.socialIcon} src="/twitter.png"></img>
        </a>
      </li>
    </ul>
  </div>
)
export default Socials
