import axios from "../axiosCustomize";

const getUserSubcription = async (id) => {
    return await axios.get(`StudentSubcription/findStudentSubcription/${id}`)
}

const getAllSubcription = async () => {
    return await axios.get(`SubcriptionControllers/GetAllSubcriptions`)
}

const purchaseSubcription = async (data, config) => {
    return await axios.post('StudentSubcription/CreateStudentSubcription', data, config)
}
 
export {getUserSubcription, getAllSubcription, purchaseSubcription}