import React, {useEffect, useMemo, useState} from 'react';
import Skill from "./Skill";
import ResumeService from "../../service/ResumeService";

const ResumeForm = ({scope, setChange, setModal, setPageError, setMessage, updatedResume}) => {

    const [formError, setFormError] = useState(false)
    const [resume, setResume] = useState({});
    const [skills, setSkills] = useState([])
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (scope == 'add') {
            setResume({name: '', descriptions: '', skills: []})
            setSkills([])
        }
        if (scope == 'update') {
            setResume({id: updatedResume.id, name: updatedResume.name, descriptions: updatedResume.descriptions})
            setSkills(updatedResume.skills)
        }
    }, [scope])

    function removeSkill(index) {
        setSkills(skills.filter(skill => skills.indexOf(skill) !== index))
    }

    function clearResume() {
        setResume({name: '', descriptions: '', skills: []})
    }

    function isSomeSkillFieldIsEmpty() {
        skills.forEach(skill => {
            if (!skill.name.length) {
                return true
            }
        })
        return false
    }

    function create(e) {
        e.preventDefault()
        if (!skills.length || isSomeSkillFieldIsEmpty()) {
            setFormError('Укажите хотя бы один навык и заполните его')
        } else {
            let tempSkills = skills;
            let tempResume = {
                name: resume.name,
                descriptions: resume.descriptions,
                skills: tempSkills
            }
            ResumeService.save(tempResume)
                .then(resp => {
                    completeModalAndBackToPage('Резюме успешно добавлено.')
                }).catch(err => {
                    handleErrorResponse(err,'Ошибка при создании резюме. Проверьте введенные данные')
            })
        }
    }

    function handleErrorResponse(err,errMessage) {
        setPageError(errMessage)
        setFormError(false)
        setMessage(false)
        setErrors(err.response.data)
    }

    function completeModalAndBackToPage(message) {
        setSkills([])
        setChange(Math.random());
        setErrors([])
        setModal(false)
        setFormError(false)
        clearResume();
        setPageError(false)
        setMessage(message)
    }

    function update(e) {
        e.preventDefault()
        if (!skills.length || isSomeSkillFieldIsEmpty()) {
            setFormError('Укажите хотя бы один навык и заполните его')
        } else {
            let tempResume = {
                id: updatedResume.id,
                name: resume.name,
                descriptions: resume.descriptions,
                skills: skills
            }
            ResumeService.update(tempResume).then(resp => {
                completeModalAndBackToPage('Резюме было успешно обновлено');
            }).catch(err => {
               handleErrorResponse(err,'Ошибка при обновлении резюме. Проверьте введенные данные')
            })
        }
    }

    function addSkill(e) {
        e.preventDefault()
        const temp = [...skills, {name: ''}]
        setSkills(temp)
    }

    return (

        <form className='container'>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Создание резюме</h1>
                </div>
                <hr/>
                {
                    formError != false && <div className='alert alert-danger'>{formError}</div>
                }
                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Название:
                        </label>
                    </div>
                    <div className="col">
                        <input className='input input-group form-control'
                               onChange={(e) => {
                                   setResume({...resume, name: e.target.value})
                               }}
                               style={errors.name ? {borderColor: "red"} : {borderColor: "gray"}}
                               value={resume.name}
                        ></input>
                        <small className="invalid-field-input">{errors.name}</small>
                    </div>
                </div>

                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Описание:</label>
                    </div>
                    <div className="col col-sm-12">
                        <textarea maxLength='200' className='input input-group form-control'
                                  onChange={(e) => {
                                      setResume({...resume, descriptions: e.target.value})
                                  }}
                                  style={errors.type ? {border: "1px solid red"} : {border: "1px solid gray"}}
                                  value={resume.descriptions}
                        ></textarea>
                        <small className="invalid-field-input">{errors.descriptions}</small>
                    </div>
                </div>

                <div className="row m-1 mb-4">
                    <div className="col-sm-4">
                        <label htmlFor="recipient-name" className="col-form-label">Навыки/умения:</label>
                    </div>
                    <div className="col-sm-8 mb-2 ">
                        <button className='btn btn-success btn-sm float-end'
                                onClick={(e) => {
                                    addSkill(e)
                                }}>Добавить навык
                        </button>
                    </div>
                    <div className="row m-1 mb-4 ">
                        <ul className="list-group list-group-flush p-0">
                            {
                                skills.map(skill =>
                                    <Skill key={skills.indexOf(skill)} skills={skills} setSkills={setSkills}
                                           skill={skill} removeSkill={removeSkill}/>
                                )
                            }
                        </ul>
                    </div>
                </div>

                <hr/>

                <div className='row justify-content-center m-3'>
                    <button
                        onClick={(e) => {
                            scope == 'add' ? create(e) : update(e)
                        }}
                        className='btn btn-success'>
                        Отправить
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ResumeForm;