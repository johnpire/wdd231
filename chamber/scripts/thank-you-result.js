const params = new URLSearchParams(window.location.search);

    document.getElementById("result-first").textContent = params.get("first") || "—";
    document.getElementById("result-last").textContent = params.get("last") || "—";
    document.getElementById("result-email").textContent = params.get("email") || "—";
    document.getElementById("result-phone").textContent = params.get("phone") || "—";
    document.getElementById("result-organization").textContent = params.get("organization") || "—";
    document.getElementById("result-timestamp").textContent = params.get("timestamp") || "—";

console.log(params.get("timestamp"))