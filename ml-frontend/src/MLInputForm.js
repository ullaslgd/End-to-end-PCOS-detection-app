import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './styles.css';

const fields = [
  'Age (yrs)', 'Weight (Kg)', 'Height(Cm) ', 'BMI', 'Blood Group', 'Pulse rate(bpm) ',
  'RR (breaths/min)', 'Hb(g/dl)', 'Cycle(R/I)', 'Cycle length(days)',
  'Marraige Status (Yrs)', 'Pregnant(Y/N)', 'No. of aborptions',
  'I beta-HCG(mIU/mL)', 'II beta-HCG(mIU/mL)', 'FSH(mIU/mL)',
  'LH(mIU/mL)', 'FSH/LH', 'Hip(inch)', 'Waist(inch)', 'Waist:Hip Ratio',
  'TSH (mIU/L)', 'AMH(ng/mL)', 'PRL(ng/mL)', 'Vit D3 (ng/mL)',
  'PRG(ng/mL)', 'RBS(mg/dl)', 'Weight gain(Y/N)', 'hair growth(Y/N)',
  'Skin darkening (Y/N)', 'Hair loss(Y/N)', 'Pimples(Y/N)',
  'Fast food (Y/N)', 'Reg.Exercise(Y/N)', 'BP _Systolic (mmHg)',
  'BP _Diastolic (mmHg)', 'Follicle No. (L)', 'Follicle No. (R)',
  'Avg. F size (L) (mm)', 'Avg. F size (R) (mm)', 'Endometrium (mm)',
  'Unnamed: 44', 'Sl. No_y', 'PCOS (Y/N)_y', 'I beta-HCG(mIU/mL)_y',
  'II beta-HCG(mIU/mL)_y', 'AMH(ng/mL)_y'
];

export default function MLInputForm() {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [response, setResponse] = useState(null);

  const onSubmit = async (data) => {
    try {
      // Convert boolean checkboxes to "Y" or "N"
      for (let key in data) {
        if (typeof data[key] === 'boolean') {
          data[key] = data[key] ? "Y" : "N";
        }
      }

      const res = await fetch('http://127.0.0.1:5000/predict', {  // Flask API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>PCOS Prediction Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div className="input-group" key={index}>
            <label>{field}</label>
            
            {/* If field contains "(Y/N)", render a toggle switch */}
            {field.includes('(Y/N)') ? (
              <input
                type="checkbox"
                {...register(field)}
                onChange={(e) => setValue(field, e.target.checked)}
                checked={watch(field)}
              />
            ) : (
              <input {...register(field)} placeholder={`Enter ${field}`} />
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>

      {response && (
        <div className="result">
          <h3>Prediction Result:</h3>
          <p>{JSON.stringify(response)}</p>
        </div>
      )}
    </div>
  );
}


