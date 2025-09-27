import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Vérification des variables d'environnement
    const config = {
      EMAIL_USER: !!process.env.EMAIL_USER,
      EMAIL_PASSWORD: !!process.env.EMAIL_PASSWORD,
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
      NODE_ENV: process.env.NODE_ENV,
    };

    console.log('Configuration email:', config);

    return NextResponse.json({
      message: 'Configuration email',
      config,
      status: 'OK'
    });

  } catch (error) {
    console.error('Erreur test config:', error);
    return NextResponse.json(
      { error: 'Erreur lors du test de configuration' },
      { status: 500 }
    );
  }
}


