from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
root = Path(__file__).resolve().parents[1] / "diagrams"
font = ImageFont.truetype("arial.ttf", 28)
title = ImageFont.truetype("arialbd.ttf", 38)
specs = {
    "architecture": ["Angular Portals", "ASP.NET Core API", "Application Modules", "SQL Server | CRM | SIP/PBX | Object Storage", "RabbitMQ | AI Workers | Redis"],
    "deployment": ["Reverse Proxy / WAF", "API Instance A", "API Instance B", "SQL Server HA | RabbitMQ | Redis | Object Storage"],
    "erd": ["Team -> Agent -> Call -> Recording", "Queue -> Call", "Customer Reference -> Call", "Campaign -> Call", "Call -> Call Event | Audit Event | Outbox"],
    "sequence": ["Caller -> SBC/PBX -> Telephony Adapter", "Telephony Adapter -> CRM lookup", "CRM -> Agent screen-pop", "Agent disposition -> SQL and integration event"],
}
for name, lines in specs.items():
    image = Image.new("RGB", (1600, 900), "white")
    draw = ImageDraw.Draw(image)
    draw.text((70, 50), name.title(), fill="#102a43", font=title)
    y = 180
    for line in lines:
        draw.rounded_rectangle((90, y, 1510, y + 100), 18, fill="#e7f5ff", outline="#0b7285", width=3)
        draw.text((130, y + 33), line, fill="#102a43", font=font)
        y += 145
    image.save(root / f"{name}.png")
