import React from "react";

export default function Difficulty ({ selectedDifficulty, setSelectedDifficulty }) {
    const handleSelectDifficulty = (value,e) => {
        setSelectedDifficulty(value);    
    };

    const difficultyOptions = [
        { label: 'Easy', value: 'easy', color: 'green' },
        { label: 'Medium', value: 'medium', color: 'orange' },
        { label: 'Hard', value: 'hard', color: 'red' },
    ];

    return (
        <div className="fillWidthDiv5">
            
            <div className="E-mail" >
                <p className="text_input" >Select Difficulty : </p>
            </div>
            {difficultyOptions.map((option) => (
                <div
                    key={option.value}
                    className={`btn m-2 ${selectedDifficulty === option.value ? 'btn-' + option.color : 'btn-outline-' + option.color}`}
                    style={{
                        borderRadius: '20px',
                        borderColor: option.color,
                        color: selectedDifficulty === option.value ? '#fff' : option.color,
                        cursor: 'pointer',
                        backgroundColor: selectedDifficulty === option.value ? option.color:"transparent",
                        padding: '5px 10px', // Decrease padding to reduce button size
                        fontSize: '14px',
                        // width:"20px",
                        // flexGrow: "1",
                        // flexShrink:"1",
                        // marginLeft:"auto"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = option.color;
                        e.currentTarget.style.color = '#fff';
                    }}
                    onMouseOut={(e) => {
                        if (selectedDifficulty !== option.value) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = option.color;
                        }
                        else{
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.backgroundColor = option.color;
                        }
                    }}
                    onClick={(e) => handleSelectDifficulty(option.value,e.currentTarget)}
                >
                {option.label}
                </div>
            ))}
       


  



  
    </div>
    );
}