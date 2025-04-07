import { NextResponse } from 'next/server'
import axios from 'axios'
import https from 'https'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { property_cost, initial_payment, years, mortgage_type } = body

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backendUrl) {
      throw new Error('Backend URL is not configured')
    }

    const response = await axios.post(`${backendUrl}/api/mortgage/calculate`, {
      property_cost,
      initial_payment,
      years,
      mortgage_type
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    })

    return NextResponse.json(response.data)
  } catch (error: any) {
    console.error('Error calculating mortgage:', error)
    
    // Проверяем, является ли ошибка SSL ошибкой
    if (error.code === 'ERR_SSL_WRONG_VERSION_NUMBER') {
      return NextResponse.json(
        {error: 'Ошибка SSL соединения. Пожалуйста, проверьте настройки сервера.'},
        {status: 500}
      )
    }

    return NextResponse.json(
      {error: 'Ошибка при расчете ипотеки. Пожалуйста, попробуйте позже.'},
      {status: 500}
    )
  }
} 