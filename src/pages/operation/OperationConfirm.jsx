import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import service from "../../services/service.config";


function OperationConfirm() {

    const [ operationConfirm, setOperationConfirm ] = useState(null)

    const [ buttonValue, setButtonValue ] = useState(true)

    const [ onSaleVinyl, setOnSaleVinyl ] = useState(true)

    const navigate = useNavigate()

    const params = useParams()
    console.log('id dinamnica de operation', params)

    useEffect(() => {
        getOperationConfirm()
        setButtonValue(true)
    }, [])

    const getOperationConfirm = async () => {
        try {
            const operation = await service.get(`/operation/${params.operationId}`)
            setOperationConfirm(operation.data)
            setOnSaleVinyl(false)
            console.log('aquí recibo el objeto de la operación desde BE', operation.data.product._id)
            const response = await service.put(`/vinyl/${operation.data.product._id}`, {
                onSale: onSaleVinyl
            })
            console.log('mi vinilo actualizado', response)

        } catch (error) {
            navigate('/error')
        }
    }

  const handleButtonChange = () => {
    setButtonValue(false)
  }

  if (operationConfirm === null) {
    return <h3>confirmando operación</h3>
  }

  return (
    <div>
        {buttonValue === true ? (
        <div>
            <h3>Album: {operationConfirm.product.title}</h3>
            <h3>Banda: {operationConfirm.product.artist}</h3>
            <img style={{width: 200}} src={operationConfirm.product.image} alt="" />
            <p>Usuario comprador: {operationConfirm.buyerUser.name}</p>
            <p>Usuario vendedor: {operationConfirm.sellerUser.name}</p>
            <p>Precio: {operationConfirm.totalPrice}</p>

            <button onClick={handleButtonChange}>Confirmar compra</button>
        </div>

        ) : (
        <div>
            <h2>¡Ya tienes tu vinilo!</h2>
            <p>Si quieres seguir dejando panoja pulsa <Link to={'/'}>aquí</Link></p>
        </div>
        )} 

    </div>

  )
}

export default OperationConfirm