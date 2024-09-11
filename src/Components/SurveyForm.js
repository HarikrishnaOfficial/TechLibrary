import React, { useState } from 'react';
import '../Styles/SurveyForm.css';

const SurveyForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        occupation: '',
        interests: {
            developer: false,
            testing: false,
            management: false
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                interests: {
                    ...formData.interests,
                    [name]: checked
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank You for Response')
        console.log('Form Data Submitted:', formData);
        setFormData({
            name: '',
            occupation: '',
            interests: {
                developer: false,
                testing: false,
                management: false
            }
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="survey-form">
                <div>
                    <h3>Survey Form</h3>
                </div>
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" />
                <div>
                    <label className="form-label">Are you a:</label>
                    <div className='occupationCont'>
                        <div className='checkboxCont'>
                            <label htmlFor="student" >Student</label>
                            <input type="radio" id="student" name="occupation" value="student" checked={formData.occupation === 'student'} onChange={handleChange} className="form-radio" />
                        </div>
                        <div className='checkboxCont'>
                            <label htmlFor="working">Working Professional</label>
                            <input type="radio" id="working" name="occupation" value="working" checked={formData.occupation === 'working'} onChange={handleChange} className="form-radio" />
                        </div>
                    </div>
                </div><br></br>
                <div>
                    <label className="form-label">Interested in:</label><br />
                    <div className='occupationCont'>
                        <div>
                            <label htmlFor="developer">Developer</label>
                            <input type="checkbox" id="developer" name="developer" checked={formData.interests.developer} onChange={handleChange} className="form-checkbox" />
                        </div>
                        <div>
                            <label htmlFor="testing">Testing</label>
                            <input type="checkbox" id="testing" name="testing" checked={formData.interests.testing} onChange={handleChange} className="form-checkbox" />
                        </div>
                        <div>
                            <label htmlFor="management">Management</label>
                            <input type="checkbox" id="management" name="management" checked={formData.interests.management} onChange={handleChange} className="form-checkbox" />
                        </div>
                    </div><br></br>
                    <button type="submit" className="form-button">Submit</button>
                </div>
            </form>
        </>
    );
};

export default SurveyForm;
