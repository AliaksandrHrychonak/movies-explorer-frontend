import React from 'react';
import EntryTitle from '../EntryTitle/EntryTitle';
import './Techs.css'

const Techs = () => {
  const techs = [
    'HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'
  ]
  return (
     <section className="techs">
      <EntryTitle title="Технологии" number={3} />
      <p className="techs__subtile">7 технологий</p>
      <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">
        {
          techs.map((tech) => 
            <li className="techs__list_element" key={tech}>
              <p className="techs__technology">{tech}</p>
            </li>
          )
        }       
      </ul>
    </section>
  );
}

export default Techs;
