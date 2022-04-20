import React from 'react';

const SkillItem = (props) => {
    return (
        <li className="list-group-item">{props.skill.name}</li>
    );
};

export default SkillItem;