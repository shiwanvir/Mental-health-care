import React, { createContext, useContext, useState } from 'react';
import moment from "moment/moment";
import darkMode from "../../styles/darkMode";

const useHook = () => {
    const [medicineTrackerEnabled, setMedicineTrackerEnabled] = useState(true);
    const [sleepTrackerEnabled, setSleepTrackerEnabled] = useState(true);
    const [theme, setTheme] = useState(darkMode.light);
    const [moodRecords, setMoodRecords] = useState([
        {
            date: (moment().day()-6),
            mood: '😄'
        },
        {
            date: (moment().day()-5),
            mood: '😞'
        },
        {
            date: (moment().day()-4),
            mood: '😠'
        },
        {
            date: (moment().day()-3),
            mood: '😌'
        },
        {
            date: (moment().day()-2),
            mood: '😠'
        },
        {
            date: (moment().day()-1),
            mood: '😄'
        },
        {
            date: (moment().day()),
            mood: undefined
        }
    ]);
    const [medicalRecords, setMedicalRecords] = useState([
        {
            date: (moment().day()-6),
            medicineTaken: true
        },
        {
            date: (moment().day()-5),
            medicineTaken: true
        },
        {
            date: (moment().day()-4),
            medicineTaken: false
        },
        {
            date: (moment().day()-3),
            medicineTaken: true
        },
        {
            date: (moment().day()-2),
            medicineTaken: false
        },
        {
            date: (moment().day()-1),
            medicineTaken: true
        },
        {
            date: (moment().day()),
            medicineTaken: undefined
        }
    ]);
    const [sleepRecords, setSleepRecords] = useState([
        {
            date: (moment().day()-6),
            sleepHours: 4
        },
        {
            date: (moment().day()-5),
            sleepHours: 5
        },
        {
            date: (moment().day()-4),
            sleepHours: 2
        },
        {
            date: (moment().day()-3),
            sleepHours: 8
        },
        {
            date: (moment().day()-2),
            sleepHours: 6
        },
        {
            date: (moment().day()-1),
            sleepHours: 7
        },
        {
            date: (moment().day()),
            sleepHours: 0
        }
    ]);
    const [dataEmpty, setDataEmpty] = useState(false);

    const clearData = () => {
        // clear mood records
        setMoodRecords([
            {
                date: (moment().day()-6),
                mood: undefined
            },
            {
                date: (moment().day()-5),
                mood: undefined
            },
            {
                date: (moment().day()-4),
                mood: undefined
            },
            {
                date: (moment().day()-3),
                mood: undefined
            },
            {
                date: (moment().day()-2),
                mood: undefined
            },
            {
                date: (moment().day()-1),
                mood: undefined
            },
            {
                date: (moment().day()),
                mood: undefined
            }
        ])

        // clear medical records
        setMedicalRecords([
            {
                date: (moment().day()-6),
                medicineTaken: undefined
            },
            {
                date: (moment().day()-5),
                medicineTaken: undefined
            },
            {
                date: (moment().day()-4),
                medicineTaken: undefined
            },
            {
                date: (moment().day()-3),
                medicineTaken: undefined
            },
            {
                date: (moment().day()-2),
                medicineTaken: undefined
            },
            {
                date: (moment().day()-1),
                medicineTaken: undefined
            },
            {
                date: (moment().day()),
                medicineTaken: undefined
            }
        ]);

        // clear sleep records
        setSleepRecords([
            {
                date: (moment().day()-6),
                sleepHours: 0
            },
            {
                date: (moment().day()-5),
                sleepHours: 0
            },
            {
                date: (moment().day()-4),
                sleepHours: 0
            },
            {
                date: (moment().day()-3),
                sleepHours: 0
            },
            {
                date: (moment().day()-2),
                sleepHours: 0
            },
            {
                date: (moment().day()-1),
                sleepHours: 0
            },
            {
                date: (moment().day()),
                sleepHours: 0
            }
        ]);

        // clear other records

        setDataEmpty(true)
    }

    function compareArrays(array1, array2) {
        // Check if the arrays have the same length
        if (array1.length !== array2.length) {
            return false;
        }

        // Compare each element in the arrays
        return array1.every((element, index) => element === array2[index]);
    }

    return {
        medicalRecords,
        setMedicalRecords,
        moodRecords,
        setMoodRecords,
        medicineTrackerEnabled,
        setMedicineTrackerEnabled,
        sleepTrackerEnabled,
        setSleepTrackerEnabled,
        sleepRecords,
        setSleepRecords,
        theme,
        setTheme,
        clearData,
        dataEmpty,
        setDataEmpty
    };
};

export const GContext = createContext({});
export const CommonProvider = ({ children }) => {
    const hook = useHook();
    return <GContext.Provider value={hook}>{children}</GContext.Provider>;
};
export const useGlobalContext = () => useContext(GContext);
