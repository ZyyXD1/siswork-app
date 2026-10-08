import { useMemo, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Tab = "Beranda" | "Cari" | "Profil";
type Range = "Semua" | "Online" | "Lokal";
type Service = {
  id: string;
  title: string;
  category: string;
  talent: string;
  initials: string;
  school: string;
  price: number;
  rating: string;
  reviews: number;
  range: Exclude<Range, "Semua">;
  location: string;
  color: string;
  symbol: string;
  description: string;
};

const categories = ["Semua", "Desain", "Website", "Video", "Menulis", "Tutor"];
const services: Service[] = [
  {
    id: "design",
    title: "Desain poster acara sekolah",
    category: "Desain",
    talent: "Nafilah Linanti",
    initials: "NL",
    school: "SMK Negeri 1 Wanayasa",
    price: 25000,
    rating: "4.9",
    reviews: 18,
    range: "Online",
    location: "Wanayasa",
    color: "#EEEAFE",
    symbol: "✳",
    description:
      "Poster digital siap cetak untuk acara sekolah, organisasi, dan kebutuhan promosi. Termasuk dua kali revisi.",
  },
  {
    id: "web",
    title: "Bikin website profil sederhana",
    category: "Website",
    talent: "Arrazy Kusuma Putra Pradita",
    initials: "AK",
    school: "SMK Negeri 1 Wanayasa",
    price: 75000,
    rating: "5.0",
    reviews: 12,
    range: "Online",
    location: "Wanayasa",
    color: "#E2F4EC",
    symbol: "⌘",
    description:
      "Website profil atau portofolio responsif untuk tugas, ekstrakurikuler, dan usaha kecil.",
  },
  {
    id: "video",
    title: "Edit video konten pendek",
    category: "Video",
    talent: "Vika Diah Febriyanti",
    initials: "VD",
    school: "SMK Negeri 1 Wanayasa",
    price: 30000,
    rating: "4.8",
    reviews: 9,
    range: "Lokal",
    location: "Purwakarta",
    color: "#FFF0E3",
    symbol: "▶",
    description:
      "Editing video Reels, TikTok, atau dokumentasi kegiatan. Bisa diskusi langsung di area Purwakarta.",
  },
  {
    id: "tutor",
    title: "Bimbingan matematika SMP",
    category: "Tutor",
    talent: "Irmatiana Asti",
    initials: "IA",
    school: "SMK Negeri 1 Wanayasa",
    price: 20000,
    rating: "4.9",
    reviews: 15,
    range: "Lokal",
    location: "Wanayasa",
    color: "#E6F1FF",
    symbol: "∑",
    description:
      "Belajar privat santai untuk memahami konsep dan latihan soal matematika SMP.",
  },
  {
    id: "writing",
    title: "Rapikan dokumen dan presentasi",
    category: "Menulis",
    talent: "Nafilah Linanti",
    initials: "NL",
    school: "SMK Negeri 1 Wanayasa",
    price: 15000,
    rating: "4.7",
    reviews: 7,
    range: "Online",
    location: "Wanayasa",
    color: "#FCE8F0",
    symbol: "▤",
    description:
      "Bantu merapikan dokumen tugas atau membuat presentasi yang rapi dan mudah dipahami.",
  },
];
const requests = [
  {
    title: "Butuh desain logo untuk ekskul",
    category: "Desain",
    budget: "Rp30–50 ribu",
    time: "2 jam lalu",
  },
  {
    title: "Cari tutor Fisika kelas 10",
    category: "Tutor",
    budget: "Bisa diskusi",
    time: "5 jam lalu",
  },
];

const rupiah = (value: number) => `Rp${value.toLocaleString("id-ID")}`;

export default function SisworkDashboard() {
  const [tab, setTab] = useState<Tab>("Beranda");
  const [category, setCategory] = useState("Semua");
  const [range, setRange] = useState<Range>("Semua");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const [detail, setDetail] = useState<Service | null>(null);
  const insets = useSafeAreaInsets();

  const filteredServices = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("id-ID");
    return services.filter((service) => {
      const matchesCategory =
        category === "Semua" || service.category === category;
      const matchesRange = range === "Semua" || service.range === range;
      const searchable =
        `${service.title} ${service.category} ${service.talent} ${service.location}`.toLocaleLowerCase(
          "id-ID",
        );
      return (
        matchesCategory && matchesRange && (!term || searchable.includes(term))
      );
    });
  }, [category, query, range]);

  const toggleSaved = (id: string) =>
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const demoNotice = (title: string) =>
    Alert.alert(
      title,
      "Fitur ini masih berupa rancangan UI dan akan dihubungkan pada tahap backend.",
    );

  const categoryFilters = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chips}
    >
      {categories.map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => setCategory(item)}
          style={[styles.chip, category === item && styles.chipActive]}
        >
          <Text
            style={[
              styles.chipText,
              category === item && styles.chipTextActive,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const reachFilters = () => (
    <View style={styles.reachFilters}>
      {(["Semua", "Online", "Lokal"] as const).map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => setRange(item)}
          style={[styles.reachChip, range === item && styles.reachChipActive]}
        >
          <Text
            style={[
              styles.reachChipText,
              range === item && styles.reachChipTextActive,
            ]}
          >
            {item === "Lokal"
              ? "⌖  Lokal"
              : item === "Online"
                ? "◎  Online"
                : "Semua"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const serviceCard = (service: Service) => (
    <TouchableOpacity
      key={service.id}
      activeOpacity={0.9}
      style={styles.serviceCard}
      onPress={() => setDetail(service)}
    >
      <View style={[styles.serviceArtwork, { backgroundColor: service.color }]}>
        <Text style={styles.serviceSymbol}>{service.symbol}</Text>
        <View style={styles.serviceCategory}>
          <Text style={styles.serviceCategoryText}>{service.category}</Text>
        </View>
        <TouchableOpacity
          style={styles.saveButton}
          accessibilityLabel="Simpan jasa"
          onPress={(event) => {
            event.stopPropagation();
            toggleSaved(service.id);
          }}
        >
          <Text
            style={[
              styles.saveIcon,
              saved.includes(service.id) && styles.saveIconActive,
            ]}
          >
            {saved.includes(service.id) ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.serviceInfo}>
        <Text numberOfLines={2} style={styles.serviceTitle}>
          {service.title}
        </Text>
        <View style={styles.talentRow}>
          <View
            style={[styles.avatarSmall, { backgroundColor: service.color }]}
          >
            <Text style={styles.avatarInitials}>{service.initials}</Text>
          </View>
          <View style={styles.talentDetails}>
            <Text numberOfLines={1} style={styles.talentName}>
              {service.talent}
            </Text>
            <Text numberOfLines={1} style={styles.school}>
              {service.school}
            </Text>
          </View>
          <Text style={styles.rating}>★ {service.rating}</Text>
        </View>
        <View style={styles.serviceFooter}>
          <Text style={styles.price}>
            {rupiah(service.price)}
            <Text style={styles.priceNote}> / mulai</Text>
          </Text>
          <Text style={styles.rangeText}>
            {service.range === "Online" ? "◎ Online" : `⌖ ${service.location}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const sectionHeading = (
    title: string,
    subtitle?: string,
    action?: string,
    onAction?: () => void,
  ) => (
    <View style={styles.sectionHeading}>
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      {action ? (
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.link}>{action}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  const homeContent = () => (
    <>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.brand}>
            <Text style={styles.brandBadge}>S</Text>
            <Text style={styles.brandAccent}>iswork</Text>
          </Text>
          <Text style={styles.brandTagline}>Ruang kolaborasi pelajar</Text>
        </View>
        <TouchableOpacity
          style={styles.notification}
          onPress={() => demoNotice("Notifikasi")}
          accessibilityLabel="Notifikasi"
        >
          <Text style={styles.notificationIcon}>♧</Text>
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Halo, Pelajar! 👋</Text>
        <Text style={styles.welcomeSubtitle}>
          Temukan keahlian hebat dari teman sekolahmu.
        </Text>
      </View>
      <SearchBox
        value={query}
        onChange={setQuery}
        onFocus={() => setTab("Cari")}
        placeholder="Cari jasa, keahlian, atau talent..."
      />
      <View style={styles.hero}>
        <View style={styles.heroOrb} />
        <Text style={styles.heroEyebrow}>PUNYA KEAHLIAN?</Text>
        <Text style={styles.heroTitle}>Karyamu bisa jadi peluang.</Text>
        <Text style={styles.heroDescription}>
          Bagikan skill, bangun portofolio, dan mulai dari sini.
        </Text>
        <TouchableOpacity
          style={styles.heroButton}
          onPress={() => setTab("Profil")}
        >
          <Text style={styles.heroButtonText}>Tawarkan jasamu →</Text>
        </TouchableOpacity>
        <Text style={styles.heroDecoration}>✳</Text>
      </View>
      {sectionHeading("Jelajahi kategori", "Cari skill yang kamu butuhkan")}
      {categoryFilters()}
      {sectionHeading(
        "Talent pilihan",
        "Karya terbaik dari teman pelajar",
        "Lihat semua",
        () => setTab("Cari"),
      )}
      {reachFilters()}
      {filteredServices.length ? (
        <View style={styles.serviceList}>
          {filteredServices.slice(0, 3).map(serviceCard)}
        </View>
      ) : (
        <EmptyState text="Belum ada jasa yang cocok. Coba filter lainnya." />
      )}
      {sectionHeading(
        "Request board",
        "Kebutuhan jasa dari komunitas",
        "+ Buat",
        () => demoNotice("Buat request"),
      )}
      {requests.map((request) => (
        <TouchableOpacity
          key={request.title}
          style={styles.requestCard}
          onPress={() => demoNotice("Kirim penawaran")}
        >
          <View style={styles.requestIcon}>
            <Text style={styles.requestIconText}>↗</Text>
          </View>
          <View style={styles.requestDetails}>
            <Text style={styles.requestTitle}>{request.title}</Text>
            <Text style={styles.requestMeta}>
              {request.category} · {request.time}
            </Text>
            <Text style={styles.requestBudget}>{request.budget}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.demoNote}>Pratinjau UI · data contoh</Text>
    </>
  );

  const searchContent = () => (
    <>
      <Text style={styles.eyebrow}>TEMUKAN TALENT</Text>
      <Text style={styles.pageTitle}>Cari jasa</Text>
      <Text style={styles.pageSubtitle}>
        Pilih keahlian yang sesuai kebutuhanmu.
      </Text>
      <SearchBox
        value={query}
        onChange={setQuery}
        placeholder="Contoh: desain poster"
      />
      <Text style={styles.filterLabel}>Kategori</Text>
      {categoryFilters()}
      <Text style={styles.filterLabel}>Jangkauan layanan</Text>
      {reachFilters()}
      <Text style={styles.resultCount}>
        {filteredServices.length} jasa ditemukan
      </Text>
      {filteredServices.length ? (
        <View style={styles.serviceList}>
          {filteredServices.map(serviceCard)}
        </View>
      ) : (
        <EmptyState text="Jasa belum ditemukan. Ubah kata kunci atau filter." />
      )}
    </>
  );

  const profileContent = () => (
    <>
      <View style={styles.profileHeading}>
        <View>
          <Text style={styles.eyebrow}>AKUN PELAJAR</Text>
          <Text style={styles.pageTitle}>Profil saya</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => demoNotice("Edit profil")}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileCard}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitial}>P</Text>
          <View style={styles.verified}>
            <Text style={styles.verifiedText}>✓</Text>
          </View>
        </View>
        <Text style={styles.profileName}>Pelajar Siswork</Text>
        <Text style={styles.profileSchool}>SMK · Purwakarta</Text>
        <Text style={styles.profileRating}>
          ★ 5.0 <Text style={styles.profileReviews}>· Belum ada ulasan</Text>
        </Text>
        <Text style={styles.profileBio}>
          Tambahkan keahlian, karya, dan pengalaman agar klien lebih mengenalmu.
        </Text>
      </View>
      <View style={styles.profileActions}>
        <TouchableOpacity
          style={styles.profileAction}
          onPress={() => demoNotice("Tambah jasa")}
        >
          <Text style={styles.profileActionIcon}>＋</Text>
          <Text style={styles.profileActionText}>Tambah jasa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileAction}
          onPress={() => demoNotice("Portofolio")}
        >
          <Text style={styles.profileActionIcon}>▧</Text>
          <Text style={styles.profileActionText}>Portofolio</Text>
        </TouchableOpacity>
      </View>
      {sectionHeading("Pesanan saya", "Pantau status pengerjaan")}
      <View style={styles.emptyOrder}>
        <Text style={styles.orderGlyph}>◷</Text>
        <View style={styles.requestDetails}>
          <Text style={styles.requestTitle}>Belum ada pesanan aktif</Text>
          <Text style={styles.requestMeta}>
            Pesanan akan tampil di sini setelah deal.
          </Text>
        </View>
      </View>
      {sectionHeading("Jasa tersimpan", `${saved.length} jasa disimpan`)}
      {saved.length ? (
        <View style={styles.serviceList}>
          {services.filter((item) => saved.includes(item.id)).map(serviceCard)}
        </View>
      ) : (
        <Text style={styles.savedEmpty}>
          Simpan jasa favorit dari katalog untuk menemukannya kembali.
        </Text>
      )}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => demoNotice("Keluar")}
      >
        <Text style={styles.logoutText}>Keluar dari akun</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FC" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 14), paddingBottom: 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {tab === "Beranda"
            ? homeContent()
            : tab === "Cari"
              ? searchContent()
              : profileContent()}
        </View>
      </ScrollView>
      <View
        style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 10) }]}
      >
        {(["Beranda", "Chat", "Cari", "Profil"] as const).map((item) => {
          const active = item !== "Chat" && tab === item;
          const icon =
            item === "Beranda"
              ? "⌂"
              : item === "Chat"
                ? "▱"
                : item === "Cari"
                  ? "⌕"
                  : "○";
          return (
            <TouchableOpacity
              key={item}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item}
              onPress={() =>
                item === "Chat" ? demoNotice("Chat") : setTab(item)
              }
              style={styles.tabButton}
            >
              <View
                style={[styles.tabIconWrap, active && styles.tabIconWrapActive]}
              >
                <Text style={[styles.tabIcon, active && styles.tabIconActive]}>
                  {icon}
                </Text>
              </View>
              <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal
        visible={detail !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setDetail(null)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.detailSheet,
              { paddingBottom: Math.max(insets.bottom, 22) },
            ]}
          >
            <View style={styles.sheetHandle} />
            {detail ? (
              <>
                <View
                  style={[
                    styles.detailArtwork,
                    { backgroundColor: detail.color },
                  ]}
                >
                  <Text style={styles.detailSymbol}>{detail.symbol}</Text>
                  <Text style={styles.detailCategory}>{detail.category}</Text>
                </View>
                <View style={styles.detailTitleRow}>
                  <Text style={styles.detailTitle}>{detail.title}</Text>
                  <TouchableOpacity onPress={() => setDetail(null)}>
                    <Text style={styles.close}>×</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.talentRow}>
                  <View
                    style={[
                      styles.avatarSmall,
                      { backgroundColor: detail.color },
                    ]}
                  >
                    <Text style={styles.avatarInitials}>{detail.initials}</Text>
                  </View>
                  <View style={styles.talentDetails}>
                    <Text style={styles.talentName}>{detail.talent}</Text>
                    <Text style={styles.school}>{detail.school}</Text>
                  </View>
                  <Text style={styles.rating}>★ {detail.rating}</Text>
                </View>
                <Text style={styles.detailSectionTitle}>Tentang jasa</Text>
                <Text style={styles.detailDescription}>
                  {detail.description}
                </Text>
                <View style={styles.detailMeta}>
                  <Text style={styles.rangeText}>
                    ★ {detail.rating} · {detail.reviews} ulasan
                  </Text>
                  <Text style={styles.rangeText}>
                    {detail.range === "Online"
                      ? "◎ Online"
                      : `⌖ ${detail.location}`}
                  </Text>
                </View>
                <View style={styles.detailFooter}>
                  <View>
                    <Text style={styles.startingLabel}>HARGA MULAI</Text>
                    <Text style={styles.detailPrice}>
                      {rupiah(detail.price)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.chatButton}
                    onPress={() => demoNotice(`Chat ${detail.talent}`)}
                  >
                    <Text style={styles.chatText}>Chat talent</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SearchBox({
  value,
  onChange,
  onFocus,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder: string;
}) {
  return (
    <View style={styles.searchBox}>
      <Text style={styles.searchGlyph}>⌕</Text>
      <TextInput
        accessibilityLabel="Cari jasa atau talent"
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor="#929AAF"
        returnKeyType="search"
        style={styles.searchInput}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChange("")}>
          <Text style={styles.clearSearch}>×</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyGlyph}>⌕</Text>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F8FC" },
  scrollContent: { alignItems: "center" },
  content: { width: "100%", maxWidth: 560, paddingHorizontal: 20 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    color: "#202B42",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  brandBadge: {
    color: "#FFFFFF",
    backgroundColor: "#4356C5",
    overflow: "hidden",
    borderRadius: 7,
    paddingHorizontal: 6,
  },
  brandAccent: { color: "#4356C5" },
  brandTagline: { color: "#8992A5", fontSize: 9, marginTop: 4 },
  notification: {
    position: "relative",
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEFF5",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationIcon: { color: "#38445C", fontSize: 21 },
  notificationDot: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ED8978",
  },
  welcome: { marginTop: 23 },
  greeting: {
    color: "#202B42",
    fontSize: 23,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  welcomeSubtitle: { color: "#7F899E", fontSize: 11, marginTop: 5 },
  searchBox: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 13,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEFF5",
  },
  searchGlyph: { color: "#7C87A0", fontSize: 23, marginRight: 8 },
  searchInput: { flex: 1, color: "#253149", fontSize: 11, paddingVertical: 0 },
  clearSearch: { color: "#7D879A", fontSize: 22 },
  hero: {
    minHeight: 184,
    padding: 18,
    marginTop: 16,
    borderRadius: 22,
    backgroundColor: "#354BB6",
    overflow: "hidden",
  },
  heroOrb: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -55,
    top: -66,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  heroEyebrow: {
    color: "#D2DAFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  heroTitle: {
    width: "78%",
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 27,
    marginTop: 10,
  },
  heroDescription: { color: "#DFE4FF", fontSize: 10, marginTop: 6 },
  heroButton: {
    alignSelf: "flex-start",
    marginTop: 13,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  heroButtonText: { color: "#354BB6", fontSize: 10, fontWeight: "800" },
  heroDecoration: {
    position: "absolute",
    right: 17,
    bottom: 16,
    color: "#E5E9FF",
    fontSize: 32,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 23,
    marginBottom: 11,
  },
  sectionTitle: { color: "#27324A", fontSize: 15, fontWeight: "800" },
  sectionSubtitle: { color: "#939BAD", fontSize: 9, marginTop: 4 },
  link: { color: "#4356C5", fontSize: 10, fontWeight: "800" },
  chips: { gap: 7, paddingBottom: 2 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E9ECF3",
  },
  chipActive: { backgroundColor: "#4356C5", borderColor: "#4356C5" },
  chipText: { color: "#6E788D", fontSize: 9, fontWeight: "700" },
  chipTextActive: { color: "#FFFFFF" },
  reachFilters: { flexDirection: "row", gap: 7, marginBottom: 10 },
  reachChip: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEFF5",
  },
  reachChipActive: { backgroundColor: "#E9EDFF", borderColor: "#DCE2FF" },
  reachChipText: { color: "#7F899B", fontSize: 9, fontWeight: "700" },
  reachChipTextActive: { color: "#4356C5" },
  serviceList: { gap: 11 },
  serviceCard: {
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },
  serviceArtwork: {
    height: 112,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceSymbol: { color: "#4A57A7", fontSize: 44, fontWeight: "300" },
  serviceCategory: {
    position: "absolute",
    left: 11,
    top: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.88)",
  },
  serviceCategoryText: { color: "#4254B2", fontSize: 8, fontWeight: "800" },
  saveButton: {
    position: "absolute",
    right: 9,
    top: 8,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  saveIcon: { color: "#66718A", fontSize: 17 },
  saveIconActive: { color: "#E66E7C" },
  serviceInfo: { padding: 12 },
  serviceTitle: {
    color: "#29344B",
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 17,
  },
  talentRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  avatarSmall: {
    width: 31,
    height: 31,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { color: "#4356B2", fontSize: 8, fontWeight: "800" },
  talentDetails: { flex: 1, marginLeft: 8 },
  talentName: { color: "#4B566C", fontSize: 9, fontWeight: "700" },
  school: { color: "#9AA2B1", fontSize: 7, marginTop: 3 },
  rating: { color: "#D39433", fontSize: 9, fontWeight: "800" },
  serviceFooter: {
    marginTop: 10,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: "#F0F1F5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: { color: "#27324A", fontSize: 12, fontWeight: "800" },
  priceNote: { color: "#9AA2B1", fontSize: 8, fontWeight: "500" },
  rangeText: { color: "#818B9E", fontSize: 9 },
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 11,
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },
  requestIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    backgroundColor: "#FFF2E7",
    alignItems: "center",
    justifyContent: "center",
  },
  requestIconText: { color: "#D58B42", fontSize: 17, fontWeight: "700" },
  requestDetails: { flex: 1, marginLeft: 9 },
  requestTitle: { color: "#303B52", fontSize: 9, fontWeight: "800" },
  requestMeta: { color: "#929BAD", fontSize: 8, marginTop: 4 },
  requestBudget: {
    color: "#485CC0",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 4,
  },
  chevron: { color: "#9AA3B4", fontSize: 22 },
  demoNote: {
    color: "#ADB4C1",
    fontSize: 8,
    textAlign: "center",
    marginVertical: 10,
  },
  eyebrow: {
    color: "#818BA0",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 7,
  },
  pageTitle: {
    color: "#202B42",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  pageSubtitle: { color: "#838DA1", fontSize: 10, marginTop: 5 },
  filterLabel: {
    color: "#303B52",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 21,
    marginBottom: 9,
  },
  resultCount: {
    color: "#818A9E",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    marginTop: 9,
  },
  emptyGlyph: { color: "#9CA6B8", fontSize: 28 },
  emptyText: {
    color: "#838DA1",
    textAlign: "center",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 8,
  },
  profileHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButton: {
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "#E9EDFF",
  },
  editText: { color: "#4356C5", fontSize: 9, fontWeight: "800" },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 20,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },
  profileAvatar: {
    width: 66,
    height: 66,
    borderRadius: 22,
    backgroundColor: "#E9EDFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitial: { color: "#4356C5", fontSize: 26, fontWeight: "800" },
  verified: {
    position: "absolute",
    right: -2,
    bottom: -1,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#47A985",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedText: { color: "#FFFFFF", fontSize: 9, fontWeight: "800" },
  profileName: {
    color: "#263149",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
  },
  profileSchool: { color: "#919AAC", fontSize: 9, marginTop: 4 },
  profileRating: {
    color: "#D39433",
    fontSize: 9,
    fontWeight: "800",
    marginTop: 8,
  },
  profileReviews: { color: "#9AA2B1", fontWeight: "500" },
  profileBio: {
    color: "#737E93",
    fontSize: 9,
    lineHeight: 14,
    textAlign: "center",
    marginTop: 10,
  },
  profileActions: { flexDirection: "row", gap: 9, marginTop: 11 },
  profileAction: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDF0F5",
    borderRadius: 14,
    padding: 11,
    alignItems: "center",
  },
  profileActionIcon: { color: "#4356C5", fontSize: 19 },
  profileActionText: {
    color: "#45516A",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 4,
  },
  emptyOrder: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDF0F5",
  },
  orderGlyph: {
    width: 37,
    height: 37,
    lineHeight: 37,
    textAlign: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFF4E3",
    color: "#C58C3D",
    fontSize: 18,
  },
  savedEmpty: {
    color: "#939BAD",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 13,
    fontSize: 9,
    lineHeight: 14,
  },
  logout: { alignItems: "center", paddingVertical: 13, marginTop: 15 },
  logoutText: { color: "#C56868", fontSize: 10, fontWeight: "700" },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ECEFF4",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  tabIconWrap: {
    width: 42,
    height: 29,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  tabIconWrapActive: { backgroundColor: "#ECEFFF" },
  tabIcon: { color: "#9CA5B5", fontSize: 21, lineHeight: 24 },
  tabIconActive: { color: "#4356C5" },
  tabLabel: { color: "#9AA3B2", fontSize: 9, fontWeight: "600" },
  tabLabelActive: { color: "#4356C5", fontWeight: "800" },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(18,25,43,0.42)",
  },
  detailSheet: {
    backgroundColor: "#F8F9FC",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 19,
    paddingTop: 10,
  },
  sheetHandle: {
    width: 37,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D5D9E2",
    alignSelf: "center",
    marginBottom: 14,
  },
  detailArtwork: {
    height: 112,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
  },
  detailSymbol: { color: "#4A57A7", fontSize: 41 },
  detailCategory: {
    color: "#4254B2",
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 9,
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 5,
    fontSize: 9,
    fontWeight: "800",
  },
  detailTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  detailTitle: {
    flex: 1,
    color: "#263149",
    fontSize: 16,
    fontWeight: "800",
    marginRight: 8,
  },
  close: { color: "#748096", fontSize: 24 },
  detailSectionTitle: {
    color: "#303B52",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 14,
  },
  detailDescription: {
    color: "#737E93",
    fontSize: 10,
    lineHeight: 16,
    marginTop: 5,
  },
  detailMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 13,
  },
  detailFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E9ECF2",
    marginTop: 14,
    paddingTop: 12,
  },
  startingLabel: {
    color: "#9AA2B1",
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  detailPrice: {
    color: "#263149",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 3,
  },
  chatButton: {
    backgroundColor: "#4356C5",
    borderRadius: 12,
    paddingHorizontal: 21,
    paddingVertical: 11,
  },
  chatText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
});
