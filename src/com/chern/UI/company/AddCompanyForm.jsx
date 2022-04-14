import React, {useState} from 'react';
import CompanyService from "../../service/CompanyService";

const AddCompanyForm = ({setMessage, addCompany}) => {

    const [newCompany, setNewCompany] = useState({
        name : "",
        type : "",
        managerName : "",
        managerSurname : "",
        managerEmail : ""
    })
    const [errors, setErrors] = useState([])
    const [formError, setFormError] = useState(false);

    function register(e){
        e.preventDefault()
        CompanyService.add(newCompany).then(resp => {
            addCompany(resp.data)
            setMessage("Компания " + resp.data.name + " успешно добавлена! Оповещение с паролем отправлено на указаннцю почту.");
            setErrors([])
            setFormError(false)
        }).catch(err => {
            setMessage(false);
            if (err.response.data.statusCode){
                setErrors([])
                setFormError(err.response.data.message)
            } else {
                setFormError(false)
                setErrors(err.response.data)
            }
        })
    }

    return (
        <form>
            <div className='col'>
                <div className="row">
                    <h1 className='text-center'>Регистрация компании</h1>
                </div><hr/>
                {
                    formError != false && <div className='alert alert-danger'>{formError}</div>
                }
                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Название:</label>
                    </div>
                    <div className="col">
                        <input className='input input-group-text'
                               onChange={(e) =>
                               {setNewCompany({...newCompany, name : e.target.value})}}
                               style={errors.name ? {borderColor : "red"} : {borderColor: "gray"}}
                        ></input>
                        <small className="invalid-field-input">{errors.name}</small>
                    </div>
                </div>

                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Тип:</label>
                    </div>
                    <div className="col">
                        <input className='input input-group-text'
                               onChange={(e) =>
                               {setNewCompany({...newCompany, type : e.target.value})}}
                               style={errors.type ? {borderColor : "red"} : {borderColor: "gray"}}
                        ></input>
                        <small className="invalid-field-input">{errors.type}</small>
                    </div>
                </div>

                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Почта:</label>
                    </div>
                    <div className="col">
                        <input className='input input-group-text'
                               onChange={(e) =>
                               {setNewCompany({...newCompany, managerEmail : e.target.value})}}
                               style={errors.managerEmail ? {borderColor : "red"} : {borderColor: "gray"}}
                        ></input>
                        <small className="invalid-field-input">{errors.managerEmail}</small>
                    </div>
                </div>

                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Имя менеджера:</label>
                    </div>
                    <div className="col">
                        <input className='input input-group-text'
                               onChange={(e) =>
                               {setNewCompany({...newCompany, managerName : e.target.value})}}
                               style={errors.managerName ? {borderColor : "red"} : {borderColor: "gray"}}
                        ></input>
                        <small className="invalid-field-input">{errors.managerName}</small>
                    </div>
                </div>

                <div className='row m-1 mb-4'>
                    <div className="col">
                        <label htmlFor="recipient-name" className="col-form-label">Фамилия менеджера:</label>
                    </div>
                    <div className="col">
                        <input className='input input-group-text'
                               onChange={(e) =>
                               {setNewCompany({...newCompany, managerSurname : e.target.value})}}
                               style={errors.managerSurname ? {borderColor : "red"} : {borderColor: "gray"}}
                        ></input>
                        <small className="invalid-field-input">{errors.managerSurname}</small>
                    </div>
                </div>

                <hr/>

                <div className='row justify-content-center m-2'>
                    <button
                        onClick={register}
                        className='btn btn-success'>
                        Зарегестрировать
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddCompanyForm;