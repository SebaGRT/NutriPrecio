#!/usr/bin/env python3
import math
import os
from PIL import Image, ImageDraw, ImageFont

DOCS_DIR = os.path.join(os.path.dirname(__file__), "docs")
os.makedirs(DOCS_DIR, exist_ok=True)


def load_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/TTF/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def text_size(draw, text, font):
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_text_centered(draw, text, x, y, font, fill="black"):
    w, h = text_size(draw, text, font)
    draw.text((x - w // 2, y - h // 2), text, font=font, fill=fill)


def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_arrow_line(draw, start, end, arrow_type="open", dashed=False, color="black", width=1, label=None, label_font=None):
    x1, y1 = start
    x2, y2 = end
    dx = x2 - x1
    dy = y2 - y1
    length = math.hypot(dx, dy)
    if length < 1:
        return
    ux, uy = dx / length, dy / length

    if dashed:
        dash_len = 8
        gap_len = 5
        dist = 0
        while dist < length - dash_len:
            sx = x1 + ux * dist
            sy = y1 + uy * dist
            ex = x1 + ux * (dist + dash_len)
            ey = y1 + uy * (dist + dash_len)
            draw.line([(sx, sy), (ex, ey)], fill=color, width=width)
            dist += dash_len + gap_len
        sx = x1 + ux * dist
        sy = y1 + uy * dist
        if dist < length:
            draw.line([(sx, sy), (x2, y2)], fill=color, width=width)
    else:
        draw.line([(x1, y1), (x2, y2)], fill=color, width=width)

    if arrow_type == "open":
        size = 10
        ax1 = x2 - ux * size - uy * size * 0.6
        ay1 = y2 - uy * size + ux * size * 0.6
        ax2 = x2 - ux * size + uy * size * 0.6
        ay2 = y2 - uy * size - ux * size * 0.6
        draw.polygon([(x2, y2), (ax1, ay1), (ax2, ay2)], outline=color, fill="white")
    elif arrow_type == "closed":
        size = 10
        ax1 = x2 - ux * size - uy * size * 0.6
        ay1 = y2 - uy * size + ux * size * 0.6
        ax2 = x2 - ux * size + uy * size * 0.6
        ay2 = y2 - uy * size - ux * size * 0.6
        draw.polygon([(x2, y2), (ax1, ay1), (ax2, ay2)], fill=color, outline=color)
    elif arrow_type == "hollow_triangle":
        size = 12
        bx = x2 - ux * size
        by = y2 - uy * size
        ax1 = bx - uy * size * 0.6
        ay1 = by + ux * size * 0.6
        ax2 = bx + uy * size * 0.6
        ay2 = by - ux * size * 0.6
        draw.polygon([(x2, y2), (ax1, ay1), (ax2, ay2)], outline=color, fill="white")
    elif arrow_type == "filled_diamond":
        size = 10
        bx = x2 - ux * size
        by = y2 - uy * size
        ax1 = bx - uy * size * 0.5
        ay1 = by + ux * size * 0.5
        ax2 = x2 - ux * size * 2
        ay2 = y2 - uy * size * 2
        ax3 = bx + uy * size * 0.5
        ay3 = by - ux * size * 0.5
        draw.polygon([(x2, y2), (ax1, ay1), (ax2, ay2), (ax3, ay3)], fill=color, outline=color)
    elif arrow_type == "hollow_diamond":
        size = 10
        bx = x2 - ux * size
        by = y2 - uy * size
        ax1 = bx - uy * size * 0.5
        ay1 = by + ux * size * 0.5
        ax2 = x2 - ux * size * 2
        ay2 = y2 - uy * size * 2
        ax3 = bx + uy * size * 0.5
        ay3 = by - ux * size * 0.5
        draw.polygon([(x2, y2), (ax1, ay1), (ax2, ay2), (ax3, ay3)], outline=color, fill="white")

    if label and label_font:
        mx = (x1 + x2) // 2
        my = (y1 + y2) // 2
        lw, lh = text_size(draw, label, label_font)
        pad = 2
        draw.rectangle([mx - lw // 2 - pad, my - lh // 2 - pad, mx + lw // 2 + pad, my + lh // 2 + pad], fill="white", outline=None)
        draw.text((mx - lw // 2, my - lh // 2), label, font=label_font, fill="black")


def draw_stick_figure(draw, cx, cy, size, label, font_actor, font_label):
    head_r = size // 5
    body_y = cy + head_r
    body_len = size * 0.35
    arm_len = size * 0.25
    leg_len = size * 0.3

    draw.ellipse([cx - head_r, cy - head_r, cx + head_r, cy + head_r], outline="black", fill="white", width=2)
    draw.line([(cx, body_y), (cx, body_y + body_len)], fill="black", width=2)
    draw.line([(cx - arm_len, body_y + body_len * 0.3), (cx + arm_len, body_y + body_len * 0.3)], fill="black", width=2)
    draw.line([(cx, body_y + body_len), (cx - leg_len, body_y + body_len + leg_len)], fill="black", width=2)
    draw.line([(cx, body_y + body_len), (cx + leg_len, body_y + body_len + leg_len)], fill="black", width=2)

    lw, lh = text_size(draw, label, font_label)
    draw.text((cx - lw // 2, body_y + body_len + leg_len + 8), label, font=font_label, fill="black")


def draw_ellipse_with_text(draw, cx, cy, rx, ry, text, font, fill="#4472C4", text_fill="white"):
    x1, y1 = cx - rx, cy - ry
    x2, y2 = cx + rx, cy + ry
    draw.ellipse([x1, y1, x2, y2], fill=fill, outline="black", width=2)
    lines = text.split("\n")
    total_h = sum(text_size(draw, ln, font)[1] for ln in lines)
    start_y = cy - total_h // 2
    for ln in lines:
        w, h = text_size(draw, ln, font)
        draw.text((cx - w // 2, start_y), ln, font=font, fill=text_fill)
        start_y += h + 2


def draw_diamond(draw, cx, cy, size, text, font, fill="#FF5722"):
    points = [(cx, cy - size), (cx + size, cy), (cx, cy + size), (cx - size, cy)]
    draw.polygon(points, fill=fill, outline="black")
    if text:
        w, h = text_size(draw, text, font)
        draw.text((cx - w // 2, cy - h // 2), text, font=font, fill="white")


def draw_class_box(draw, x, y, w, name, attrs, methods, fill_color, font, bold_font, border_color="black"):
    pad = 8
    line_h = max(text_size(draw, "Mg", font)[1], 16)
    name_h = line_h + pad * 2
    attr_h = len(attrs) * line_h + pad * 2 if attrs else pad
    meth_h = len(methods) * line_h + pad * 2 if methods else pad
    total_h = name_h + attr_h + meth_h

    draw.rectangle([x, y, x + w, y + total_h], fill=fill_color, outline=border_color, width=2)
    draw.line([(x, y + name_h), (x + w, y + name_h)], fill=border_color, width=2)
    if attrs:
        draw.line([(x, y + name_h + attr_h), (x + w, y + name_h + attr_h)], fill=border_color, width=2)

    nw, nh = text_size(draw, name, bold_font)
    draw.text((x + w // 2 - nw // 2, y + (name_h - nh) // 2), name, font=bold_font, fill="black")

    ay = y + name_h + pad
    for a in attrs:
        draw.text((x + pad, ay), a, font=font, fill="black")
        ay += line_h

    my = y + name_h + attr_h + pad
    for m in methods:
        draw.text((x + pad, my), m, font=font, fill="black")
        my += line_h

    return total_h


def generate_use_case():
    W, H = 1600, 1200
    img = Image.new("RGB", (W, H), "white")
    draw = ImageDraw.Draw(img)

    font_sm = load_font(12)
    font_md = load_font(14)
    font_lg = load_font(18, bold=True)
    font_actor = load_font(13)
    font_stereo = load_font(11)

    bx1, by1, bx2, by2 = 350, 60, 1350, 1140
    draw.rectangle([bx1, by1, bx2, by2], fill="#D6E4F0", outline="#4472C4", width=2)
    draw_text_centered(draw, "NutriPrecio", (bx1 + bx2) // 2, by1 + 25, font_lg, fill="#1F3864")

    use_cases = {
        "UC1": (580, 180, 110, 32, "Registrar cuenta"),
        "UC2": (1050, 180, 110, 32, "Iniciar sesión"),
        "UC3": (580, 300, 110, 32, "Cerrar sesión"),
        "UC4": (1050, 300, 120, 32, "Registrar tienda / pyme"),
        "UC5": (580, 420, 130, 32, "Editar perfil de tienda"),
        "UC6": (1050, 420, 120, 32, "Acceder al Dashboard"),
        "UC7": (580, 540, 120, 32, "Ver estado del perfil"),
        "UC8": (1050, 660, 120, 32, "Buscar productos"),
        "UC9": (580, 780, 120, 32, "Comparar precios"),
        "UC10": (1050, 780, 140, 32, "Ver detalle de producto"),
        "UC11": (580, 900, 160, 32, "Gestionar productos\nde la tienda"),
    }

    uc_coords = {}
    for key, (cx, cy, rx, ry, label) in use_cases.items():
        draw_ellipse_with_text(draw, cx, cy, rx, ry, label, font_md, fill="#4472C4", text_fill="white")
        uc_coords[key] = (cx, cy, rx, ry)

    draw_stick_figure(draw, 160, 400, 110, "Comprador", font_actor, font_actor)
    draw_stick_figure(draw, 160, 700, 110, "Vendedor\nIndependiente", font_actor, font_actor)
    draw_stick_figure(draw, 1440, 500, 110, "Sistema", font_actor, font_actor)

    def ellipse_edge(cx, cy, rx, ry, tx, ty):
        dx = tx - cx
        dy = ty - cy
        ang = math.atan2(dy, dx)
        return cx + rx * math.cos(ang), cy + ry * math.sin(ang)

    associations = [
        (160, 400, "Comprador", ["UC1", "UC2", "UC3", "UC8", "UC9", "UC10"]),
        (160, 700, "Vendedor", ["UC1", "UC2", "UC3", "UC4", "UC5", "UC6", "UC7", "UC11"]),
        (1440, 500, "Sistema", ["UC2", "UC4", "UC6"]),
    ]

    for ax, ay, _, targets in associations:
        for t in targets:
            cx, cy, rx, ry = uc_coords[t]
            ex, ey = ellipse_edge(cx, cy, rx, ry, ax, ay)
            if ax < cx:
                draw_arrow_line(draw, (ax + 35, ay), (ex, ey), arrow_type="open", dashed=False)
            else:
                draw_arrow_line(draw, (ax - 35, ay), (ex, ey), arrow_type="open", dashed=False)

    relations = [
        ("UC2", "UC1", "<<include>>"),
        ("UC6", "UC2", "<<include>>"),
        ("UC4", "UC5", "<<extend>>"),
        ("UC6", "UC7", "<<extend>>"),
        ("UC6", "UC11", "<<extend>>"),
        ("UC8", "UC10", "<<extend>>"),
        ("UC10", "UC9", "<<extend>>"),
    ]

    for src, dst, stereo in relations:
        sx, sy, srx, sry = uc_coords[src]
        dx, dy, drx, dry = uc_coords[dst]
        ex1, ey1 = ellipse_edge(sx, sy, srx, sry, dx, dy)
        ex2, ey2 = ellipse_edge(dx, dy, drx, dry, sx, sy)
        draw_arrow_line(draw, (ex1, ey1), (ex2, ey2), arrow_type="open", dashed=True, label=stereo, label_font=font_stereo)

    img.save(os.path.join(DOCS_DIR, "diagrama-casos-de-uso.png"))
    print("Saved diagrama-casos-de-uso.png")


def class_box_height(draw, attrs, methods, font):
    pad = 8
    line_h = max(text_size(draw, "Mg", font)[1], 16)
    name_h = line_h + pad * 2
    attr_h = len(attrs) * line_h + pad * 2 if attrs else pad
    meth_h = len(methods) * line_h + pad * 2 if methods else pad
    return name_h + attr_h + meth_h


def generate_class():
    W, H = 1800, 1500
    img = Image.new("RGB", (W, H), "white")
    draw = ImageDraw.Draw(img)

    font = load_font(13)
    font_bold = load_font(13, bold=True)
    font_sm = load_font(11)
    font_title = load_font(16, bold=True)

    class_specs = {
        "AbstractUser": (100, 260, "#E0E0E0", [
            "<<Django>>",
            "+bool is_staff",
            "+bool is_active",
            "+bool is_superuser",
        ], []),
        "Usuario": (450, 260, "#FFF8DC", [
            "+int id",
            "+String username",
            "+String email",
            "+String first_name",
            "+String last_name",
            "+String password",
            "+DateTime created_at",
            "+DateTime updated_at",
        ], ["+__str__() String"]),
        "Categoria": (100, 260, "#FFF8DC", [
            "+int id",
            "+String name",
            "+String slug",
            "+Categoria parent",
            "+Image image",
        ], ["+obtenerHijos() List~Categoria~", "+__str__() String"]),
        "Producto": (450, 280, "#FFF8DC", [
            "+int id",
            "+String name",
            "+String slug",
            "+String brand",
            "+Categoria category",
            "+String unit",
            "+Image image",
            "+String description",
            "+String barcode",
            "+DateTime created_at",
            "+DateTime updated_at",
        ], ["+obtenerUltimoPrecio() Precio", "+__str__() String"]),
        "Tienda": (850, 260, "#FFF8DC", [
            "+int id",
            "+String name",
            "+String slug",
            "+Image logo",
            "+URL website",
            "+bool is_active",
            "+DateTime created_at",
            "+DateTime updated_at",
        ], ["+__str__() String"]),
        "Precio": (650, 280, "#FFF8DC", [
            "+int id",
            "+Producto product",
            "+Tienda store",
            "+Decimal price",
            "+Decimal original_price",
            "+Decimal discount_percentage",
            "+URL url",
            "+bool in_stock",
            "+DateTime recorded_at",
        ], ["+__str__() String"]),
        "GestorUsuario": (100, 260, "#FFDAB9", [
            "+registrar(username, email, password) User",
            "+login(username, password) Token",
            "+logout() void",
            "+validarCredenciales(username, password) bool",
            "+obtenerUsuarioActual() User",
        ], []),
        "GestorTienda": (450, 260, "#FFDAB9", [
            "+registrarTienda(datos) Tienda",
            "+editarTienda(slug, datos) Tienda",
            "+listarTiendas() List~Tienda~",
            "+obtenerTienda(slug) Tienda",
            "+eliminarTienda(slug) void",
        ], []),
        "GestorProducto": (800, 280, "#FFDAB9", [
            "+listarProductos(filtros) List~Producto~",
            "+buscarProductos(query) List~Producto~",
            "+obtenerProducto(slug) Producto",
            "+crearProducto(datos) Producto",
            "+editarProducto(slug, datos) Producto",
            "+eliminarProducto(slug) void",
        ], []),
        "Dashboard": (1200, 280, "#FFC0CB", [
            "+verificarAcceso(usuario) bool",
            "+mostrarBienvenida() void",
            "+mostrarEstadoPerfil() void",
            "+gestionarProductos() void",
        ], []),
    }

    heights = {name: class_box_height(draw, attrs, methods, font) for name, (_, _, _, attrs, methods) in class_specs.items()}

    y_abstractuser = 80
    y_usuario = 80
    y_categoria = 400
    y_producto = 400
    y_tienda = 400
    y_precio = 740
    y_dashboard = 400
    y_gestor_usuario = 1060
    y_gestor_tienda = 1060
    y_gestor_producto = 1060

    positions = {
        "AbstractUser": (100, y_abstractuser),
        "Usuario": (450, y_usuario),
        "Categoria": (100, y_categoria),
        "Producto": (450, y_producto),
        "Tienda": (850, y_tienda),
        "Precio": (650, y_precio),
        "GestorUsuario": (100, y_gestor_usuario),
        "GestorTienda": (450, y_gestor_tienda),
        "GestorProducto": (800, y_gestor_producto),
        "Dashboard": (1200, y_dashboard),
    }

    boxes = {}
    for name, (x, y) in positions.items():
        w, color, attrs, methods = class_specs[name][0], class_specs[name][2], class_specs[name][3], class_specs[name][4]
        h = draw_class_box(draw, x, y, w, name, attrs, methods, color, font, font_bold)
        boxes[name] = (x, y, w, h)

    def box_edge(bx, by, bw, bh, tx, ty):
        cx, cy = bx + bw // 2, by + bh // 2
        dx = tx - cx
        dy = ty - cy
        ang = math.atan2(dy, dx)
        if abs(dx) * bh > abs(dy) * bw:
            ex = bx + bw // 2 + (bw // 2) * (1 if dx > 0 else -1)
            ey = cy + (bh // 2) * abs(dy / dx) * (1 if dy > 0 else -1)
            if ey > by + bh:
                ey = by + bh
            if ey < by:
                ey = by
        else:
            ey = by + bh // 2 + (bh // 2) * (1 if dy > 0 else -1)
            ex = cx + (bw // 2) * abs(dx / dy) * (1 if dx > 0 else -1)
            if ex > bx + bw:
                ex = bx + bw
            if ex < bx:
                ex = bx
        return ex, ey

    rels = [
        ("Usuario", "AbstractUser", "hollow_triangle", False, "hereda"),
        ("GestorUsuario", "Usuario", "closed", False, "gestiona"),
        ("GestorTienda", "Tienda", "closed", False, "gestiona"),
        ("GestorProducto", "Producto", "closed", False, "gestiona"),
        ("Producto", "Categoria", "closed", False, "1"),
        ("Categoria", "Categoria", "closed", False, "padre"),
        ("Precio", "Producto", "closed", False, "1"),
        ("Precio", "Tienda", "closed", False, "1"),
        ("Tienda", "Usuario", "closed", False, "1"),
        ("Dashboard", "Tienda", "closed", True, ""),
        ("Dashboard", "Producto", "closed", True, ""),
        ("Dashboard", "Usuario", "closed", True, ""),
    ]

    for src, dst, atype, dashed, label in rels:
        sx, sy, sw, sh = boxes[src]
        dx, dy, dw, dh = boxes[dst]
        if src == dst:
            rx = sx + sw
            ry = sy + sh // 2
            draw.arc([rx, ry - 40, rx + 60, ry + 40], start=270, end=90, fill="black", width=2)
            draw_arrow_line(draw, (rx + 30, ry - 40), (rx, ry - 20), arrow_type="closed", dashed=False)
            if label:
                lw, lh = text_size(draw, label, font_sm)
                draw.text((rx + 35, ry - lh // 2), label, font=font_sm, fill="black")
            continue

        ex1, ey1 = box_edge(sx, sy, sw, sh, dx + dw // 2, dy + dh // 2)
        ex2, ey2 = box_edge(dx, dy, dw, dh, sx + sw // 2, sy + sh // 2)
        draw_arrow_line(draw, (ex1, ey1), (ex2, ey2), arrow_type=atype, dashed=dashed, label=label if label else None, label_font=font_sm)

    img.save(os.path.join(DOCS_DIR, "diagrama-clases.png"))
    print("Saved diagrama-clases.png")


def generate_activity_single(title, nodes, filename):
    W = 2200
    lane_widths = [460, 580, 580, 580]
    lanes = ["Usuario", "Frontend", "Backend", "Base de Datos"]
    lane_colors = ["#F5F5F5", "#FFFFFF", "#F5F5F5", "#FFFFFF"]

    font = load_font(13)
    font_sm = load_font(12)
    font_title = load_font(16, bold=True)
    font_guard = load_font(11)

    header_h = 60
    title_h = 50
    top_margin = 30
    bottom_margin = 30

    H = top_margin + title_h + header_h + len(nodes) * 85 + bottom_margin + 60

    img = Image.new("RGB", (W, H), "white")
    draw = ImageDraw.Draw(img)

    # Draw lane backgrounds
    x = 0
    for i, (name, lw, lc) in enumerate(zip(lanes, lane_widths, lane_colors)):
        draw.rectangle([x, 0, x + lw, H], fill=lc, outline="#CCCCCC", width=1)
        draw.rectangle([x, 0, x + lw, header_h], fill="#E0E0E0", outline="#999999", width=2)
        tw, th = text_size(draw, name, font_title)
        draw.text((x + lw // 2 - tw // 2, header_h // 2 - th // 2), name, font=font_title, fill="black")
        x += lw

    # Draw lane separators
    x = 0
    for lw in lane_widths:
        x += lw
        draw.line([(x, 0), (x, H)], fill="#999999", width=2)

    # Draw section title
    tw, th = text_size(draw, title, font_title)
    draw.text((W // 2 - tw // 2, top_margin), title, font=font_title, fill="#1A237E")

    y_cursor = top_margin + title_h + 10

    # Compute x offsets for lane centers
    x_offsets = []
    cx = 0
    for lw in lane_widths:
        x_offsets.append(cx + lw // 2)
        cx += lw

    # Draw nodes
    node_positions = []
    node_y = y_cursor

    for node in nodes:
        li = node["lane"]
        cx = x_offsets[li]
        ntype = node["type"]
        text = node.get("text", "")
        guard = node.get("guard", "")

        if ntype == "start":
            draw.ellipse([cx - 12, node_y - 12, cx + 12, node_y + 12], fill="#D32F2F", outline="black")
            node_positions.append((cx, node_y, 12, 12, "start"))
            node_y += 70
        elif ntype == "end":
            draw.ellipse([cx - 14, node_y - 14, cx + 14, node_y + 14], fill="#D32F2F", outline="black", width=2)
            draw.ellipse([cx - 8, node_y - 8, cx + 8, node_y + 8], fill="white", outline="black", width=2)
            node_positions.append((cx, node_y, 14, 14, "end"))
            node_y += 70
        elif ntype == "decision":
            size = 30
            draw_diamond(draw, cx, node_y, size, "", font, fill="#FF5722")
            if guard:
                gw, gh = text_size(draw, guard, font_guard)
                draw.text((cx + size + 6, node_y - gh // 2), guard, font=font_guard, fill="black")
            node_positions.append((cx, node_y, size, size, "decision"))
            node_y += 75
        elif ntype == "activity":
            tw, th = text_size(draw, text, font)
            pad_x = 16
            pad_y = 10
            rw = max(tw + pad_x * 2, 140)
            rh = th + pad_y * 2
            nx = cx - rw // 2
            ny = node_y - rh // 2
            shape = node.get("shape", "rect")
            if shape == "db":
                draw_rounded_rect(draw, [nx, ny, nx + rw, ny + rh], 10, fill="#2196F3", outline="#1565C0", width=2)
                draw.arc([nx + 10, ny - 8, nx + rw - 10, ny + 8], start=0, end=180, fill="#1565C0", width=2)
            else:
                draw_rounded_rect(draw, [nx, ny, nx + rw, ny + rh], 10, fill="#2196F3", outline="#1565C0", width=2)
            draw.text((cx - tw // 2, node_y - th // 2), text, font=font, fill="white")
            node_positions.append((cx, node_y, rw // 2, rh // 2, "activity"))
            node_y += 80
        else:
            node_positions.append((cx, node_y, 0, 0, "unknown"))
            node_y += 70

    # Draw arrows between nodes
    for i in range(len(node_positions) - 1):
        x1, y1, _, _, t1 = node_positions[i]
        x2, y2, _, _, t2 = node_positions[i + 1]
        if abs(x1 - x2) < 10:
            draw.line([(x1, y1 + 12), (x2, y2 - 12)], fill="black", width=2)
            draw.polygon([(x2, y2 - 12), (x2 - 5, y2 - 22), (x2 + 5, y2 - 22)], fill="black")
        else:
            mid_y = (y1 + y2) // 2
            draw.line([(x1, y1 + 12), (x1, mid_y)], fill="black", width=2)
            draw.line([(x1, mid_y), (x2, mid_y)], fill="black", width=2)
            draw.line([(x2, mid_y), (x2, y2 - 12)], fill="black", width=2)
            draw.polygon([(x2, y2 - 12), (x2 - 5, y2 - 22), (x2 + 5, y2 - 22)], fill="black")

    img.save(os.path.join(DOCS_DIR, filename))
    print(f"Saved {filename}")


MV03_NODES = [
    {"lane": 0, "type": "start", "text": ""},
    {"lane": 0, "type": "activity", "text": "Acceder a NutriPrecio"},
    {"lane": 0, "type": "decision", "text": "", "guard": "¿Está autenticado?"},
    {"lane": 0, "type": "activity", "text": "Ir a Iniciar sesión"},
    {"lane": 0, "type": "activity", "text": "Solicitar registro de tienda"},
    {"lane": 1, "type": "activity", "text": "Mostrar formulario de datos de tienda"},
    {"lane": 1, "type": "activity", "text": "Vendedor ingresa: nombre, logo, sitio web"},
    {"lane": 1, "type": "activity", "text": "Validar campos del formulario"},
    {"lane": 1, "type": "decision", "text": "", "guard": "¿Datos válidos?"},
    {"lane": 1, "type": "activity", "text": "Mostrar errores de validación"},
    {"lane": 1, "type": "activity", "text": "Enviar datos al Backend"},
    {"lane": 2, "type": "activity", "text": "Recibir datos en POST /api/stores/"},
    {"lane": 2, "type": "activity", "text": "Verificar Token de autenticación"},
    {"lane": 2, "type": "decision", "text": "", "guard": "¿Usuario autenticado?"},
    {"lane": 2, "type": "activity", "text": "Retornar error 401"},
    {"lane": 2, "type": "activity", "text": "Vincular Tienda al Usuario"},
    {"lane": 2, "type": "activity", "text": "Generar slug único"},
    {"lane": 3, "type": "activity", "text": "INSERT en tabla Store", "shape": "db"},
    {"lane": 3, "type": "decision", "text": "", "guard": "¿Slug ya existe?"},
    {"lane": 3, "type": "activity", "text": "Regenerar slug", "shape": "db"},
    {"lane": 3, "type": "activity", "text": "Guardar relación Store-User", "shape": "db"},
    {"lane": 2, "type": "activity", "text": "Guardar logo en /media/stores/"},
    {"lane": 2, "type": "activity", "text": "Retornar respuesta con datos de la tienda"},
    {"lane": 1, "type": "activity", "text": "Mostrar tienda registrada exitosamente"},
    {"lane": 0, "type": "activity", "text": "Recibir confirmación de registro"},
    {"lane": 0, "type": "activity", "text": "Revisar datos de la tienda publicada"},
    {"lane": 0, "type": "decision", "text": "", "guard": "¿Desea editar datos?"},
    {"lane": 0, "type": "activity", "text": "Modificar información de la tienda"},
    {"lane": 1, "type": "activity", "text": "Enviar datos editados al Backend"},
    {"lane": 2, "type": "activity", "text": "Recibir datos en PUT /api/stores/slug/"},
    {"lane": 3, "type": "activity", "text": "UPDATE registro Store", "shape": "db"},
    {"lane": 2, "type": "activity", "text": "Retornar datos actualizados"},
    {"lane": 0, "type": "end", "text": ""},
]

MV52_NODES = [
    {"lane": 0, "type": "start", "text": ""},
    {"lane": 0, "type": "activity", "text": "Acceder a NutriPrecio"},
    {"lane": 0, "type": "decision", "text": "", "guard": "¿Tiene cuenta?"},
    {"lane": 0, "type": "activity", "text": "Seleccionar Registrarse"},
    {"lane": 0, "type": "activity", "text": "Seleccionar Iniciar sesión"},
    {"lane": 1, "type": "activity", "text": "Mostrar formulario de Registro"},
    {"lane": 1, "type": "activity", "text": "Ingresar: username, email, contraseña"},
    {"lane": 1, "type": "activity", "text": "Validar formato de campos"},
    {"lane": 1, "type": "decision", "text": "", "guard": "¿Formato válido?"},
    {"lane": 1, "type": "activity", "text": "Mostrar errores de formato"},
    {"lane": 1, "type": "activity", "text": "Enviar datos al Backend"},
    {"lane": 2, "type": "activity", "text": "POST /api/users/register/"},
    {"lane": 2, "type": "activity", "text": "Encriptar contraseña con create_user()"},
    {"lane": 3, "type": "activity", "text": "INSERT en tabla User", "shape": "db"},
    {"lane": 3, "type": "decision", "text": "", "guard": "¿Email ya existe?"},
    {"lane": 3, "type": "activity", "text": "Retornar error de duplicado", "shape": "db"},
    {"lane": 2, "type": "activity", "text": "Generar Token de autenticación"},
    {"lane": 3, "type": "activity", "text": "INSERT en tabla Token", "shape": "db"},
    {"lane": 2, "type": "activity", "text": "Retornar user + token"},
    {"lane": 1, "type": "activity", "text": "Almacenar Token en localStorage"},
    {"lane": 1, "type": "activity", "text": "Mostrar formulario de Login"},
    {"lane": 1, "type": "activity", "text": "Ingresar: username, contraseña"},
    {"lane": 2, "type": "activity", "text": "POST /api/users/login/"},
    {"lane": 2, "type": "activity", "text": "Validar credenciales"},
    {"lane": 3, "type": "activity", "text": "SELECT User por credenciales", "shape": "db"},
    {"lane": 3, "type": "decision", "text": "", "guard": "¿Usuario encontrado?"},
    {"lane": 2, "type": "activity", "text": "Obtener o crear Token"},
    {"lane": 3, "type": "activity", "text": "SELECT Token del usuario", "shape": "db"},
    {"lane": 2, "type": "activity", "text": "Retornar error 401"},
    {"lane": 1, "type": "activity", "text": "Mostrar error: credenciales inválidas"},
    {"lane": 1, "type": "activity", "text": "Configurar authInterceptor con Token"},
    {"lane": 1, "type": "activity", "text": "Redirigir a página principal"},
    {"lane": 0, "type": "end", "text": ""},
]

MV54_NODES = [
    {"lane": 0, "type": "start", "text": ""},
    {"lane": 0, "type": "activity", "text": "Navegar al Dashboard"},
    {"lane": 0, "type": "decision", "text": "", "guard": "¿Desea acceder al panel?"},
    {"lane": 0, "type": "activity", "text": "Solicitar acceso al Dashboard"},
    {"lane": 1, "type": "activity", "text": "authGuard verifica autenticación"},
    {"lane": 1, "type": "decision", "text": "", "guard": "¿Token existe en localStorage?"},
    {"lane": 1, "type": "activity", "text": "Redirigir a /login con returnUrl"},
    {"lane": 1, "type": "activity", "text": "Cargar Layout del Dashboard"},
    {"lane": 2, "type": "activity", "text": "GET /api/users/me/"},
    {"lane": 2, "type": "activity", "text": "Verificar Token en header Authorization"},
    {"lane": 3, "type": "activity", "text": "SELECT en tabla Token", "shape": "db"},
    {"lane": 3, "type": "decision", "text": "", "guard": "¿Token existe y es válido?"},
    {"lane": 2, "type": "activity", "text": "Retornar error 401"},
    {"lane": 3, "type": "activity", "text": "SELECT en tabla User", "shape": "db"},
    {"lane": 2, "type": "decision", "text": "", "guard": "¿Token válido?"},
    {"lane": 2, "type": "activity", "text": "Retornar datos del usuario"},
    {"lane": 1, "type": "activity", "text": "Mostrar Sidebar con navegación"},
    {"lane": 1, "type": "activity", "text": "Mostrar vista de Inicio"},
    {"lane": 1, "type": "activity", "text": "Mostrar mensaje de bienvenida"},
    {"lane": 2, "type": "activity", "text": "GET /api/stores/ filtrado por usuario"},
    {"lane": 3, "type": "activity", "text": "SELECT en tabla Store por owner", "shape": "db"},
    {"lane": 2, "type": "decision", "text": "", "guard": "¿Tiene tienda asociada?"},
    {"lane": 2, "type": "activity", "text": "Retornar datos de la tienda"},
    {"lane": 2, "type": "activity", "text": "Retornar lista vacía"},
    {"lane": 1, "type": "decision", "text": "", "guard": "¿Tienda registrada?"},
    {"lane": 1, "type": "activity", "text": "Mostrar estado actual del perfil de tienda"},
    {"lane": 1, "type": "activity", "text": "Mostrar invitación a registrar tienda"},
    {"lane": 0, "type": "end", "text": ""},
]


def generate_activity():
    generate_activity_single(
        "Flujo MV-03: Registro de Tienda por Vendedor",
        MV03_NODES,
        "diagrama-actividades-mv03.png"
    )
    generate_activity_single(
        "Flujo MV-52: Registro e Inicio de Sesión",
        MV52_NODES,
        "diagrama-actividades-mv52.png"
    )
    generate_activity_single(
        "Flujo MV-54: Acceso al Dashboard del Vendedor",
        MV54_NODES,
        "diagrama-actividades-mv54.png"
    )


if __name__ == "__main__":
    generate_use_case()
    generate_class()
    generate_activity()
