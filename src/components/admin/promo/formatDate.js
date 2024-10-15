import { format } from 'date-fns';

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM do, yyyy h:mm a');
};


// import { format } from 'date-fns';

// export const formatDate = (dateString) => {
//     const date = new Date(dateString);

//     console.log('Date String:', dateString);
//     console.log('Parsed Date:', date);
    
//     if (isNaN(date.getTime())) {
//         throw new Error('Invalid date format');
//     }

//     return format(date, 'MMMM do, yyyy h:mm a');
// };
