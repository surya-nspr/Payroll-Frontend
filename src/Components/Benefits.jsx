import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PayrollProcessorService from '../Services/PayrollProcessorService';
import './styles.css'

const Benefits = () => {
    const [benefitName, setBenefitName] = useState('');
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState('');
    const [coverage, setCoverage] = useState('');

    const navigate = useNavigate();
    const { benefitId } = useParams();

        useEffect(() => {
            // Fetch benefit details if in update mode
            if (benefitId) {
                PayrollProcessorService.getBenefitsById(benefitId)
                    .then((response) => {
                        console.log('Benefit details:', response.data);
                        // Set state with benefit details
                        setBenefitName(response.data.benefitName);
                        setAmount(response.data.amount);
                        setDescription(response.data.description);
                        setCoverage(response.data.coverage);
                    })
                    .catch((error) => {
                        console.error('Error fetching benefit details:', error);
                    });
            }
        }, [benefitId]);
    
        const saveOrUpdateBenefits = (e) => {
            e.preventDefault();
            const benefits = {
                benefitName,
                amount,
                description,
                coverage
            };
    
            if (benefitId) {
                // Update existing benefit
                PayrollProcessorService.updateBenefits(benefitId, benefits)
                    .then(() => {
                        console.log('Benefit updated successfully');
                        navigate('/payroll-processor/benefits');
                    })
                    .catch((error) => {
                        console.error('Error updating benefit:', error);
                    });
            } else {
                // Submit new benefit
                PayrollProcessorService.addBenefits(benefits)
                    .then(() => {
                        console.log('Benefit added successfully');
                        navigate('/payroll-processor/benefits');
                    })
                    .catch((error) => {
                        console.error('Error adding benefit:', error);
                    });
            }
        };
    
        return (
            <div className='blur-background'>
    <div className='benefits-form-container'>
                <h2 className="text-center">{benefitId ? 'Update Benefit' : 'Add Benefit'}</h2>
                <form onSubmit={saveOrUpdateBenefits}>
                    <div className="mb-3">
                        <label htmlFor="benefitName" className="form-label">Benefit Name</label>
                        <input type="text" className="form-control" id="benefitName" value={benefitName} onChange={(e) => setBenefitName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="coverage" className="form-label">Coverage</label>
                        <input type="text" className="form-control" id="coverage" value={coverage} onChange={(e) => setCoverage(e.target.value)} />
                    </div>
                    {/* Include fields for employees and departments as needed */}
                    <button type="submit" className="btn btn-primary">{benefitId ? 'Update Benefit' : 'Add Benefit'}</button>
                    <Link to="/payroll" className="btn btn-secondary ms-2">Cancel</Link>
                </form>
            </div>
            </div>
        );
    };
export default Benefits;