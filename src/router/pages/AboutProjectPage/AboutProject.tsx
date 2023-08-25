import style from './AboutProject.module.scss';
import company from '../../../data/company.json';
import Accordion from '../../../components/Accordion/Accordion';

const AboutProject = () => {
  return (
    <div className={style.aboutproject}>
      <div className={style.header}>
        <div className={style.header__text}>{company.slogan}</div>
      </div>

      <div className={style.subheader}>
        <div className={style.container}>
          <div className={style.subheader__top}>{company.mission_statement}</div>
          <div className={style.subheader__bottom}>{company.mission_statement_add}</div>
        </div>
      </div>

      <div className={style.advantages}>
        <div className={style.container}>
          <div className={style.advantages__items}>
            {company.company_advantages.map((advantage, i) => (
              <div key={advantage.id} className={style.advantages__item}>
                <div
                  className={style.advantages__image}
                  style={{ order: `${i % 2 === 0 ? '0' : '1'}` }}
                >
                  <img
                    src={`/images/img_album${advantage.photo_url}`}
                    alt={advantage.name}
                  />
                </div>
                <div className={style.advantages__content}>
                  <div className={style.advantages__title}>{advantage.title}</div>
                  <div className={style.advantages__text}>{advantage.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.touristlove}>
        <div className={style.container}>
          <h3 className={style.touristlove__title}>За что нас любят путешественники</h3>
          <p className={style.touristlove__text}>{company.tourist_love}</p>
          <div className={style.touristlove__cards}>
            {company.key_figures.map((figure) => (
              <div key={figure.id} className={style.touristlove__card}>
                <div className={style.card__value}>{figure.number}</div>
                <div className={style.card__text}>{figure.number_unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.question__label}>
        <div className={style.label}>
          <img src="/icons/question.svg" alt="question" />
        </div>
      </div>

      <div className={style.questions}>
        <div className={style.container}>
          <div className={style.questions__title}>Вопросы и ответы</div>
          <div className={style.questions__wrapper}>
            {company.questions.map((question) => (
              <div key={question.id} className={style.questions__item}>
                <div className={style.question__item_desktop}>
                  <div className={style.question}>{question.question}</div>
                  <div className={style.answer}>{question.answer}</div>
                </div>
                <Accordion title={question.question} content={question.answer} />
              </div>
            ))}
          </div>
          <div className={style.contacts}>
            Остались вопросы? Напишите нам на почту{' '}
            <span style={{ fontWeight: '700' }}>
              <a
                style={{ color: 'inherit' }}
                href={`mailto:${company.contacts.email.value}`}
              >
                {company.contacts.email.value}
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProject;
