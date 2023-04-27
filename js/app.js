const battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;

const indicator1 = document.getElementById('indicator1');
const indicator2 = document.getElementById('indicator2');
const batteryCharge = document.getElementById('battery-charge');
const batteryTop = document.getElementById('battery-top');
const chargeIcon = document.getElementById('battery-charging');
const batteryCharged = document.getElementById('battery-charged');
const batteryDischarged = document.getElementById('battery-discharged');

let chargingState = 0;

function updateBatteryStatus() {
  const percentage = Math.round(battery.level * 100);
  indicator1.innerHTML = `Battery charge at ${percentage}%`;
  batteryCharge.style.width = `${percentage}%`;
  batteryCharged.innerHTML = battery.chargingTime === Infinity ? 'Infinity' : parseInt(battery.chargingTime / 60, 10);
  batteryDischarged.innerHTML = battery.dischargingTime === Infinity ? 'Infinity' : parseInt(battery.dischargingTime / 60, 10);

  if (percentage >= 99) {
    batteryTop.style.backgroundColor = 'limegreen';
    batteryCharge.style.backgroundColor = 'limegreen';
    createNotification('Device battery fully charged.');
  }

  if (battery.charging) {
    if (chargingState === 1 || chargingState === 0) {
      batteryTop.style.backgroundColor = 'gold';
      batteryCharge.style.backgroundColor = 'gold';
      indicator2.innerHTML = 'Battery is charging'; 
      chargeIcon.style.visibility = 'visible';
      createNotification('Device battery now charging.');
      chargingState = 2;
    }
  } else if (!battery.charging) {
    if (chargingState === 2 || chargingState === 0) {
      batteryTop.style.backgroundColor = '#eee';
      batteryCharge.style.backgroundColor = '#eee';
      indicator2.innerHTML = 'Battery not charging';
      chargeIcon.style.visibility = 'hidden';
      createNotification('Device battery is not charging.');
      chargingState = 1;
    }
  }
}

battery.addEventListener('chargingchange', updateBatteryStatus, false);
battery.addEventListener('levelchange', updateBatteryStatus, false);
battery.addEventListener('chargingtimechange', updateBatteryStatus, false);
battery.addEventListener('dischargingtimechange', updateBatteryStatus, false);

updateBatteryStatus();
