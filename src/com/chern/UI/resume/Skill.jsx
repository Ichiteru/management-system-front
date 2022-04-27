import React, {useState} from 'react';
import {VIEW_SCOPE} from "../../service/CommonService";

const Skill = (props) => {

    function remove(e){
        e.preventDefault()
        props.removeSkill(props.skills.indexOf(props.skill));
    }

    return (
        <li className="list-group-item">
            <div className="row row-cols-lg-2">
                <div className="col p-0">
                    {
                        props.scope != VIEW_SCOPE ?
                    <input
                        onChange={(e)=> {
                            props.setSkills(props.skills.map(r => props.skills.indexOf(r) !== props.skills.indexOf(props.skill) ? r : {name: e.target.value}))
                        }}
                        className='input input-group form-control' value={props.skill.name}/>
                            :
                            <big>{props.skill.name}</big>
                    }
                </div>
                <div className="col p-0">
                    {
                        props.scope != VIEW_SCOPE &&
                    <button style={{float: 'right'}} className='btn btn-sm btn-danger'
                            onClick={(e)=> {remove(e)}}>Удалить</button>
                    }
                </div>
            </div>
        </li>
    );
};

export default Skill;