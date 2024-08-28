import DocumentIcon from "@/assets/icons/document_icon.svg";
import NoticeIcon from "@/assets/icons/notice_icon.svg";
import HomeIcon from "@/assets/icons/home_icon.svg";
import CalendarIcon from "@/assets/icons/calendar_icon.svg";
import ChatIcon from "@/assets/icons/chat_icon.svg";
import { ReactElement, useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Href, usePathname, useRouter } from "expo-router";
type menuItem = {
  name: string;
  src: Href<string | object>;
  icon: ReactElement;
  url: string;
};

const Menu = () => {
  const pathName = usePathname();
  const router = useRouter();
  const theme = {
    colors: {
      mainColor: "#FFB65A",
      gray: "#AAA",
    },
  };

  const mainMenu = useMemo<menuItem[]>(
    () => [
      {
        name: "서류",
        src: "/document" as Href<string>,
        url: "/document",
        icon: (
          <DocumentIcon
            stroke={
              pathName === "/document"
                ? theme.colors.mainColor
                : theme.colors.gray
            }
            strokeWidth={2.5}
          />
        ),
      },
      {
        name: "공고",
        src: "/notice" as Href<string>,
        url: "https://giggle-fe.vercel.app/notice",
        icon: (
          <NoticeIcon
            stroke={
              pathName === "/notice"
                ? theme.colors.mainColor
                : theme.colors.gray
            }
            strokeWidth={2}
          />
        ),
      },
      {
        name: "홈",
        src: "/home" as Href<string>,
        url: "https://giggle-fe.vercel.app/",
        icon: (
          <HomeIcon
            stroke={
              pathName === "/" ? theme.colors.mainColor : theme.colors.gray
            }
            strokeWidth={2}
          />
        ),
      },
      {
        name: "캘린더",
        src: "/calendar" as Href<string>,
        url: "https://giggle-fe.vercel.app/calendar",
        icon: (
          <CalendarIcon
            stroke={
              pathName === "/calendar"
                ? theme.colors.mainColor
                : theme.colors.gray
            }
            strokeWidth={2.5}
          />
        ),
      },
      {
        name: "챗봇",
        src: "/chatbot" as Href<string>,
        url: "https://giggle-fe.vercel.app/chatbot",
        icon: (
          <ChatIcon
            stroke={
              pathName === "/chatbot"
                ? theme.colors.mainColor
                : theme.colors.gray
            }
            strokeWidth={2.5}
          />
        ),
      },
    ],
    []
  );

  return (
    <View style={styles.container}>
      {mainMenu.map((item, idx) => (
        <Pressable
          key={idx}
          style={[styles.menuBox]}
          onPress={() => router.push({pathname: item.src, params: {url: item.url}})}
        >
          {item.icon}
          <Text
            style={
              pathName === item.src ? styles.menuTextCurrent : styles.menuText
            }
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: 'flex',
    position: "absolute",
    bottom: 0,
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    marginLeft: 25,
    paddingHorizontal: 25,
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
    backgroundColor: "#FFFFFF",
  },
  menuBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  menuText: {
    fontSize: 11,
    textAlign: "center",
    color: "#AAA",
  },
  menuTextCurrent: {
    fontSize: 11,
    textAlign: "center",
    color: "#FFB65A",
  },
});
