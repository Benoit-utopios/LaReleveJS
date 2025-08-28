// script.js
window.addEventListener('DOMContentLoaded', () => {
  // ---------- DONNÉES DU TABLEAU DE BORD ----------
  const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

  // Pas quotidiens
  const stepsData = [7800, 9200, 10300, 6500, 8000, 12000, 11500];

  // Sommeil en heures décimales
  const sleepData = [6 + 30/60, 8 + 10/60, 7 + 45/60, 6 + 50/60, 7 + 20/60, 8, 7 + 55/60];

  // Activités hebdomadaires comptées
  const activitiesRaw = ["Travail", "Travail", "Sport", "Travail", "Repos", "Sport", "Repos"];
  const activityCounts = {};
  activitiesRaw.forEach(act => { activityCounts[act] = (activityCounts[act] || 0) + 1; });

  const activitiesLabels = Object.keys(activityCounts);
  const activitiesValues = Object.values(activityCounts);

  // ---------- CONFIGURATION DES CHARTS ----------
  const sleepChartData = {
    labels,
    datasets: [{
      label: "Heures de sommeil",
      data: sleepData,
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 2,
      tension: 0.3,
      fill: true
    }]
  };

  const stepsChartData = {
    labels,
    datasets: [{
      label: "Pas quotidiens",
      data: stepsData,
      backgroundColor: "rgba(255, 206, 86, 0.2)",
      borderColor: "rgba(255, 206, 86, 1)",
      borderWidth: 2
    }]
  };

  const activitiesChartData = {
    labels: activitiesLabels,
    datasets: [{
      label: "Activités hebdomadaires",
      data: activitiesValues,
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(75, 192, 192, 0.6)"
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(75, 192, 192, 1)"
      ],
      borderWidth: 1
    }]
  };

  // ---------- CONFIGS ----------
  const sleepConfig = { type: 'line', data: sleepChartData, options: { responsive: true } };
  const stepsConfig = { type: 'bar', data: stepsChartData, options: { responsive: true } };
  const activitiesConfig = { type: 'doughnut', data: activitiesChartData, options: { responsive: true } };

  // ---------- INITIALISATION DES CHARTS ----------
  const sleepChart = document.getElementById('sleepChart');
  const stepsChart = document.getElementById('stepsChart');
  const activitiesChart = document.getElementById('activitiesChart');

  if (sleepChart) new Chart(sleepChart.getContext('2d'), sleepConfig);
  if (stepsChart) new Chart(stepsChart.getContext('2d'), stepsConfig);
  if (activitiesChart) new Chart(activitiesChart.getContext('2d'), activitiesConfig);

  // ---------- STAT CARDS DYNAMIQUES ----------
  const statSteps = document.querySelector(".stat-card:nth-child(1) .stat-number");
  const statSleep = document.querySelector(".stat-card:nth-child(2) .stat-number");
  const statProd = document.querySelector(".stat-card:nth-child(3) .stat-number");

  if(statSteps) statSteps.textContent = stepsData[labels.length - 1].toLocaleString(); // dernier jour
  if(statSleep) statSleep.textContent = `${Math.floor(sleepData[sleepData.length-1])}h ${Math.round((sleepData[sleepData.length-1]%1*60))}m`;
  if(statProd) statProd.textContent = "78%"; // valeur fixe, peut être calculée depuis productivité si nécessaire
});
