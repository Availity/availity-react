import React, { useState, useEffect } from 'react';
import { Form } from '@availity/form';
import { useFormikContext } from 'formik';

const Results = () => {
    const [results,setResults] = useState(null);
    const { values = {}, errors, submitCount, isValidating } = useFormikContext();

    useEffect(() => {
        if(submitCount > 0 && !isValidating) {
            setResults({
                submitted: new Date().toJSON(),
                errors:window.JSON.stringify(errors,null,2),
                values: window.JSON.stringify(values,null,2)
            });
        }
    },[submitCount,isValidating]);

    return results && (
        <div>
            <p>Results (submitted {results.submitted}):</p>
            <p>Errors: {results.errors}</p>
            <div>
                Values: <pre>{results.values}</pre>
            </div>
        </div>
    )
};

export default ({ children, ...props}) => {

    return(
        <Form {...props}>
        {children}
        <hr />
        <Results />
        </Form>)
}