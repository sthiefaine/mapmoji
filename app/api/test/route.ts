import { time } from "console";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  let updatedAnyCountry = false;

  const params = {
    latitude: "43.6109",
    longitude: "3.8763",
    uv: "uv_index_clear_sky,",
    current: "temperature_2m,is_day,weather_code,",
    timezone: "America/New_York",
    forecast_days: "1",
  };

  // https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.longitude}&timezone=${params.timezone}&forecast_days=${params.forecast_days}

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=${params.current}${params.uv}`;
  const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&hourly=${params.current}${params.uv}&timezone=${params.timezone}&forecast_days=${params.forecast_days}`;

  const weather = await fetch(url2, { cache: "no-store" }).then((res) =>
    res.json()
  );

  return new NextResponse(JSON.stringify(weather), {
    status: 200,
  });
};
