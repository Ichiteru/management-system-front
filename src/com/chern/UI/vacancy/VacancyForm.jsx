import React, {useEffect, useState} from 'react';
import Skill from "../resume/Skill";
import VacancyService from "../../service/VacancyService";
import {ADD_SCOPE} from "../../service/CommonService";

const VacancyForm = ({setChange, scope, setSuccessMsg, setModal}) => {

    const [requirements, setRequirements] = useState([]);
    const [vacancy, setVacancy] = useState({});
    const [errors, setErrors] = useState({});
    const [formError, setFormError] = useState(false)

    useEffect(() => {
        if (scope == ADD_SCOPE) {
            setVacancy({post: '', suggestedSalary: -1, requirements: []})
        }
    }, [scope])

    function addRequirement(e) {
        e.preventDefault();
        const temp = [...requirements, {name: ''}]
        setRequirements(temp)
    }

    function clearVacancyState() {
        setVacancy({post: '', suggestedSalary: -1, requirements: []})
    }

    function removeRequirement(index) {
        setRequirements(requirements.filter(requirement => requirements.indexOf(requirement) !== index))
    }

    function create(e) {
        e.preventDefault()
        if (!requirements.length) {
            setFormError('Добавьте требование')
        } else {
            let tempVacancy = {
                post: vacancy.post,
                suggestedSalary: vacancy.suggestedSalary,
                requirements: requirements
            }
            VacancyService.save(tempVacancy).then(resp => {
                setChange(Math.random());
                setFormError(false)
                setModal(false)
                setSuccessMsg('Вакансия "' + tempVacancy.post + '" успешно добавлена')
                clearVacancyState()
            }).catch(err => {
                setErrors(err.response.data)
                setFormError('Ошибка при создании вакансии. Проверьте правильность введенных данных.')
                setSuccessMsg(false);
            })
        }
    }

    return (
        <form className='container'>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Создание вакансии</h1>
                </div>
                <hr/>
                {
                    formError != false && <div className='alert alert-danger'>{formError}</div>
                }
                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Должность:
                        </label>
                    </div>
                    <div className="col">
                        <input className='input input-group form-control'
                               onChange={(e) => {
                                   setVacancy({...vacancy, post: e.target.value})
                               }}
                               style={errors.post ? {borderColor: "red"} : {borderColor: "gray"}}
                               value={vacancy.post}
                        ></input>
                        <small className="invalid-field-input">{errors.post}</small>
                    </div>
                </div>

                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Заработная плата:</label>
                    </div>
                    <div className="col">
                        <input type="number" min='0' max='100000' className='input input-group form-control'
                               onChange={(e) => {
                                   setVacancy({...vacancy, suggestedSalary: e.target.value})
                               }}
                               style={errors.suggestedSalary ? {borderColor: "red"} : {borderColor: "gray"}}
                               value={vacancy.suggestedSalary}
                        ></input>
                        <small className="invalid-field-input">{errors.suggestedSalary}</small>
                    </div>
                </div>

                <div className="row m-1 mb-4">
                    <div className="col-sm-4">
                        <label htmlFor="recipient-name" className="col-form-label">Требования:</label>
                    </div>
                    <div className="col-sm-8 mb-2 ">
                        <button className='btn btn-success btn-sm float-end'
                                onClick={(e) => {
                                    addRequirement(e)
                                }}> Добавить требование
                        </button>
                    </div>
                    <div className="row m-1 mb-4 ">
                        <ul className="list-group list-group-flush p-0">
                            {
                                requirements.map(requirement =>
                                    <Skill key={requirements.indexOf(requirement)} skills={requirements}
                                           setSkills={setRequirements}
                                           skill={requirement} removeSkill={removeRequirement}/>
                                )
                            }
                        </ul>
                    </div>
                </div>

                <hr/>

                <div className='row justify-content-center m-3'>
                    <button
                        onClick={(e) => {
                            // scope == 'add' ? create(e) : update(e)
                            create(e)
                        }}
                        className='btn btn-success'>
                        Отправить
                    </button>
                </div>
            </div>
        </form>
    );
};

export default VacancyForm;