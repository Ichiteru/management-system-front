import React, {useState} from 'react';

const Skill = (props) => {

    function remove(e){
        e.preventDefault()
        props.removeSkill(props.skills.indexOf(props.skill));
    }

    return (
        <li className="list-group-item">
            <div className="row row-cols-lg-2">
                <div className="col p-0">
                    <input
                        onChange={(e)=> {
                            props.setSkills(props.skills.map(r => props.skills.indexOf(r) !== props.skills.indexOf(props.skill) ? r : {name: e.target.value}))
                        }}
                        className='input input-group form-control' value={props.skill.name}/>
                </div>
                <div className="col p-0">
                    <button style={{float: 'right'}} className='btn btn-sm btn-danger'
                    onClick={(e)=> {remove(e)}}>Удалить</button>
                </div>
            </div>
        </li>
    );
};

export default Skill;