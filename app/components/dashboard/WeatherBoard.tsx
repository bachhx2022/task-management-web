import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useGetWeatherDetailsQuery } from "@/lib/features/weather/weatherApi";
import { useGetLocationDetailsQuery } from "@/lib/features/location/locationApi";

export const WeatherBoard = () => {
  const { data: location } = useGetLocationDetailsQuery();

  const { data, isLoading } = useGetWeatherDetailsQuery(location?.city || "", {
    skip: !location,
  });

  const {
    location: { name, country },
    current: {
      temp_c,
      condition: { text: conditionText, icon },
      wind_kph,
      pressure_mb,
      precip_mm,
      humidity,
      cloud,
      feelslike_c,
    },
  } = data?.data || {
    location: {},
    current: {
      condition: {},
    },
  };

  return (
    <Card variant="outlined" style={{ margin: "auto", marginTop: 20 }}>
      <CardContent>
        {!data || isLoading ? (
          <Typography variant="h6" component="div" gutterBottom>
            Loading...
          </Typography>
        ) : (
          <>
            <Typography variant="h6" component="div" gutterBottom>
              {name}, {country}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                >
                  <img
                    src={icon}
                    alt={conditionText}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  <span>{conditionText}</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="textSecondary">
                  <span style={{ fontWeight: "bold" }}>
                    Temperature: {temp_c}°C
                  </span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <span>Feels Like: {feelslike_c}°C</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                >
                  <span>Wind: {wind_kph} kph</span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <span>Precipitation: {precip_mm} mm</span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <span>Pressure: {pressure_mb} mb</span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <span>Humidity: {humidity}%</span>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <span>Cloud Coverage: {cloud}%</span>
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};
