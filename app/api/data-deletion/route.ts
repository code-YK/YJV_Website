import { NextResponse } from 'next/server'

type DataDeletionRequest = {
  fullName?: string
  email?: string
  product?: string
  requestDetails?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DataDeletionRequest
    const fullName = body.fullName?.trim()
    const email = body.email?.trim()
    const product = body.product?.trim()
    const requestDetails = body.requestDetails?.trim()

    if (!fullName || !email || !product || !requestDetails) {
      return NextResponse.json(
        { error: 'Please complete all required fields before submitting the request.' },
        { status: 400 },
      )
    }

    return NextResponse.json({
      message: 'Your deletion request has been received. We will review it and respond within 7 business days.',
      receivedAt: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: 'Unable to process the request right now. Please email info@yjventures.in instead.' },
      { status: 500 },
    )
  }
}