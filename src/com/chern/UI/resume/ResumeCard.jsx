import React from 'react';
import SkillItem from "./SkillItem";

const ResumeCard = (props) => {

    function remove(e) {
        e.preventDefault()
        props.deleteById(props.resume.id);
    }

    function update(e) {
        e.preventDefault()
        props.openUpdateModal(props.resume)
    }

    return (
        <div className='col-sm-4'>
            <div className="card" style={{width: "25rem"}}>
                <div className="card-body">
                    <h5 className="card-title">{props.resume.name}</h5>
                    <p className="card-text">{props.resume.descriptions}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {
                        props.resume.skills.map(skill => <SkillItem key={skill.name} skill={skill}/>)
                    }
                </ul>
                <div className="card-body">
                    <a href="#" className="card-link link-danger"
                       style={{float: 'right'}}
                       onClick={(e) => {remove(e)}}
                    >Удалить</a>
                    <a href="#" className="card-link link-primary"
                       style={{float: 'left'}}
                       onClick={(e) => {update(e)}}
                    >Обновить</a>
                </div>
            </div>
        </div>
    );
};

export default ResumeCard;